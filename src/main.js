require.config({
   paths: {
     'backbone': 'lib/backbone-0.5.3.optamd3',
     'underscore': 'lib/underscore-1.2.3',
     'jquery': 'lib/jquery-1.7.1'
   },
   baseUrl: ".",
   waitSeconds: 15,
   urlArgs: "bust=" +  (new Date()).getTime()
});

require(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
  /**
   * Workspace
   */
  var Workspace = Backbone.Model.extend({
    place: function(player, count) {
      var current = this.workers(player.id);
      this.set(player.id, current + count);
    },
    resolve: function(player) {
      var roll = 0,
        resourceName = this.get('resource'),
        value = this.get('value'),
        workers = this.workers(player.id);
      for (var i=0; i<workers; i++) {
        roll += Math.round(Math.random() * 6) + 1;
      }
      this.set(player.id, undefined);
      var resourceCount = Math.floor(roll / value);
      player.addWorkers(workers);
      player.addResource(resourceName, resourceCount);
      alert('Player ' + player.id + ' rolled ' + roll + ' and got ' + resourceCount +' ' + resourceName);
      this.trigger('resolve', player);
      return resourceCount;
    },
    workers: function(playerId) {
      if (playerId === undefined) {
        var i, total = 0;
        for (i=1; i<=4; ++i) {
          total += this.workers(i);
        }
        return total;
      } else {
        return this.get(playerId) || 0;
      }
    }
  });

  /**
   * Workspace collection
   */
  var Workspaces = Backbone.Collection.extend({
    model: Workspace,
    initialize: function() {
      this.bind('add', this._onAdd, this);
    },
    toResolve: function(player) {
      return this.reduce(function(memo, workspace) {
        if (player) {
          return memo + workspace.workers(player.id);
        } else {
          return memo + workspace.workers();
        }
      }, 0);
    },
    _onAdd: function(workspace) {
      workspace.bind('resolve', this._onResolve, this);
    },
    _onResolve: function(player) {
      if (this.toResolve() === 0) {
        this.trigger('allresolved');
      } else if (this.toResolve(player) === 0) {
        this.trigger('playerresolved');
      }
    }
  });

  /**
   * Workspace view
   */
  var WorkspaceView = Backbone.View.extend({
    className: 'workspace',
    events: {
      'click': 'click'
    },
    initialize: function() {
      this.model.bind('change', this.render, this);
    },
    render: function() {
      $(this.el).empty().addClass(this.model.get('name'));
      for (var i=1; i<=4; ++i) {
        $('<div/>')
          .addClass('worker-pile player' + i)
          .appendTo(this.el)
          .html(this.model.get(i));
      }
      return this;
    },
    click: function() {
      this.options.board.activate(this.model);
    }
  });

  /**
   * Player
   */
  var Player = Backbone.Model.extend({
    defaults: {
      workers: 5,
      wood: 0,
      brick: 0,
      stone: 0,
      gold: 0
    },
    place: function(workspace, count) {
      var workers = this.get('workers');
      count = count || 1;
      count = Math.min(count, workers);
      this.set('workers', workers - count);
      workspace.place(this, count);
      this.trigger('place');
    },
    addWorkers: function(count) {
      this.set('workers', this.get('workers') + count);
    },
    addResource: function(resource, count) {
      this.set(resource, this.get(resource) + count);
    }
  });

  /**
   * Players collection
   */
  var Players = Backbone.Collection.extend({
    model: Player,
    initialize: function() {
      this.gotoLeader();
      this.bind('add', this._onAdd, this);
    },
    gotoLeader: function() {
      this.active = 0;
    },
    nextTurn: function() {
      this.active = (this.active + 1) % this.length;
    },
    current: function() {
      return this.at(this.active);
    },
    remainingWorkers: function() {
      return this.reduce(function(memo, player) {
        return memo + player.get('workers');
      }, 0);
    },
    _onAdd: function(player) {
      player.id = this.length;
      player.bind('place', this._onPlace, this);
    },
    _onPlace: function() {
      this.nextTurn();
      if (this.remainingWorkers() === 0) {
        this.trigger('resolve');
      }
    }
  });

  /**
   * Player view
   */
  var PlayerView = Backbone.View.extend({
    className: 'player-board',
    initialize: function() {
      this.model.bind('change', this.render, this);
    },
    render: function() {
      $(this.el).empty().addClass('player' + this.model.id);
      $('<div/>').addClass('worker-pile').html('Workers: ' + this.model.get('workers')).appendTo(this.el);
      $('<div/>').addClass('resource-pile wood').html('Wood: ' + this.model.get('wood')).appendTo(this.el);
      $('<div/>').addClass('resource-pile brick').html('Brick: ' + this.model.get('brick')).appendTo(this.el);
      $('<div/>').addClass('resource-pile stone').html('Stone: ' + this.model.get('stone')).appendTo(this.el);
      $('<div/>').addClass('resource-pile gold').html('Gold: ' + this.model.get('gold')).appendTo(this.el);
      return this;
    }
  });

  /**
   * Board
   */
  var Board = Backbone.Model.extend({
    defaults: {
      phase: 'place'
    },
    initialize: function() {
      var workspaces = new Workspaces();
      workspaces.add(new Workspace({
        name: 'forest',
        resource: 'wood',
        value: 3
      }));
      workspaces.add(new Workspace({
        name: 'claypit',
        resource: 'brick',
        value: 4
      }));
      workspaces.add(new Workspace({
        name: 'quary',
        resource: 'stone',
        value: 5
      }));
      workspaces.add(new Workspace({
        name: 'river',
        resource: 'gold',
        value: 6
      }));
      this.workspaces = workspaces;

      this.get('players').bind('resolve', function() {
        this.get('players').gotoLeader();
        this.set('phase', 'resolve');
      }, this);
      this.workspaces.bind('playerresolved', function() {
        this.get('players').nextTurn();
      }, this);
      this.workspaces.bind('allresolved', function() {
        this.get('players').gotoLeader();
        this.set('phase', 'place');
      }, this);
    },
    activate: function(workspace) {
      this[this.get('phase')](workspace);
    },
    place: function(workspace) {
      var player = this.get('players').current(),
        workers = prompt('Player ' + player.id + ', how many workers?');
      player.place(workspace, workers);
    },
    resolve: function(workspace) {
      var player = this.get('players').current();
      workspace.resolve(player);
    }
  });

  /**
   * Board view
   */
  var BoardView = Backbone.View.extend({
    className: 'board',
    render: function() {
      this.model.workspaces.each(function(workspace) {
        var view = new WorkspaceView({
          model: workspace,
          board: this.model
        });
        $(view.render().el).appendTo(this.el);
      }, this);
      return this;
    }
  });

  $(function() {
    var players = new Players(),
      board = new Board({
        players: players
      }),
      boardView = new BoardView({
        model: board
      });

    $(boardView.render().el).appendTo('body');

    players.add(new Player());
    players.add(new Player());

    players.each(function(player) {
      var view = new PlayerView({
        model: player
      });
      $(view.render().el).appendTo('body');
    });
  });
});
