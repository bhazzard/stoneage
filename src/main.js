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
   * Creates the visual representation of the board
   */
  function createBoard() {
    //Create the main board element
    $('<div/>')
      .attr('id', 'board')
      .appendTo('body');
  };

  /**
   * Resolution phase
   */
  function resolve(resourceSpace, players) {
    var playerName = players.current().id;

    $(resourceSpace).trigger('resolve', [players]);

    //Figure out how many spots remain to be resolved
    var remainingPlayer = _($('.workspace .worker-pile.player' + playerName)).reduce(function(memo, elem) {
      return memo + Number($(elem).html());
    }, 0);

    var remainingTotal = _($('.workspace .worker-pile')).reduce(function(memo, elem) {
      return memo + Number($(elem).html());
    }, 0);

    if (remainingTotal === 0) {
      players.gotoLeader();
      return placeWorkers;
    } else if (remainingPlayer === 0) {
      players.nextTurn();
      return resolve;
    } else {
      return resolve;
    }
  };

  function roll(numDice) {
    var total = 0;
    for (var i=0; i<numDice; i++) {
      total += Math.round(Math.random() * 6) + 1;
    }

    return total;
  };

  function resolveResourceSpace(resourceName, value) {
    return function(event, players) {
      var player = players.current(),
        playerName = player.id,
        workers = Number($(this).find('.worker-pile.player' + playerName).html()),
        diceRoll = roll(workers),
        resourceCount = Math.floor(diceRoll / value);
      alert('Player' + playerName + ' rolled ' + diceRoll + ' and got ' + resourceCount + ' ' + resourceName);

      player.addWorkers(workers);
      player.set(resourceName, resourceCount);

      $('.worker-pile.player' + playerName, this).html('');
    };
  };

  /**
   * Workspace
   */
  var Workspace = Backbone.Model.extend({
    place: function(player, count) {
      var current = this.get(player.id) || 0;
      this.set(player.id, current + count);
    },
    resolve: function() {
    },
    total: function() {
      var i, total = 0;
      for (i=1; i<=4; ++i) {
        total += this.get(i);
      }
      return total;
    }
  });

  /**
   * Workspace collection
   */
  var Workspaces = Backbone.Collection.extend({
    model: Workspace,
    toResolve: function(player) {
      return this.reduce(function(memo, workspace) {
        if (player) {
          return memo + workspace.get(player.id);
        } else {
          return memo + workspace.total();
        }
      }, 0);
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
      var player = this.options.players.current(),
        workers = prompt('Player ' + player.id + ', how many workers?');

      player.place(this.model, workers);
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

  $(function() {
    var players = new Players(),
      workspaces = new Workspaces();

    createBoard();

    //Add a workspace view for each workspace
    workspaces.bind('add', function(workspace) {
      var view = new WorkspaceView({
        model: workspace,
        players: players
      });
      $(view.render().el).appendTo('#board');
    });

    //Add a player view for each player
    players.bind('add', function(player) {
      var view = new PlayerView({
        model: player
      });
      $(view.render().el).appendTo('body');
    });

    players.add(new Player());
    players.add(new Player());

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

    $('.forest').on('resolve', resolveResourceSpace('wood', 3));
    $('.claypit').on('resolve', resolveResourceSpace('brick', 4));
    $('.quary').on('resolve', resolveResourceSpace('stone', 5));
    $('.river').on('resolve', resolveResourceSpace('gold', 6));
  });
});
