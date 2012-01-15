define([
    'backbone',
    'src/models/workspace',
    'src/models/workspaces',
    'src/models/field',
    'src/models/specialhut',
    'src/models/toolhut',
    'src/models/hunt',
    'src/models/buildings'
  ], function(Backbone, Workspace, Workspaces, Field, SpecialHut, ToolHut, Hunt, Buildings) {
  return Backbone.Model.extend({
    defaults: {
      phase: 'place'
    },
    initialize: function() {
      var buildings = new Buildings([], {
        players: this.get('players').length
      });
      var workspaces = new Workspaces();
      workspaces.add([
        new Hunt(),
        new Workspace({
          name: 'forest',
          resource: 'wood',
          value: 3,
          maxWorkers : 7,
          maxPlayers : 2
        }),
        new Workspace({
          name: 'claypit',
          resource: 'brick',
          value: 4,
          maxWorkers : 7,
          maxPlayers : 2
        }),
        new Workspace({
          name: 'quary',
          resource: 'stone',
          value: 5,
          maxWorkers : 7,
          maxPlayers : 2
        }),
        new Workspace({
          name: 'river',
          resource: 'gold',
          value: 6,
          maxWorkers : 7,
          maxPlayers : 2
        }),
        new Field(),
        new SpecialHut(),
        new ToolHut()
      ]);
      workspaces.add(buildings.models);
      this.workspaces = workspaces;
      this.buildings = buildings;
      this.buildings.bind('remove', function(building) {
        this.workspaces.remove(building);
      }, this);

      this.workspaces.bind('playerresolved', function() {
        this.get('players').nextTurn();
      }, this);
      this.workspaces.bind('allresolved', function() {
        this.feed();
      }, this);
      this.workspaces.bind('place', function() {
        var players = this.get('players');
        if (players.remainingWorkers() === 0) {
          this.get('players').gotoLeader();
          this.set('phase', 'resolve');
        } else {
          players.nextTurn();
        }
      }, this);
      this.get('players').bind('allfed', function() {
        this.reset();
      }, this);
    },
    activate: function(workspace) {
      this[this.get('phase')](workspace);
    },
    place: function(workspace) {
      var i = 0,
        players = this.get('players'),
        player = players.current(),
        workers;

      //Skip players with 0 workers left to place
      //There is probably a better place for this.
      //Maybe the players collection should know more
      //about phases?
      while (i++ < players.length && player.get('workers') === 0) {
        players.nextTurn();
        player = players.current();
      }

      workers = parseInt(workers);
	  if(workspace.canPlace(player)){
        workspace.place(player);
	  }
    },
    resolve: function(workspace) {
      var player = this.get('players').current();
      if(workspace.canResolve(player)) {
        workspace.resolve(player);
      }
    },
    feed: function() {
      this.get('players').feed();
    },
    reset: function() {
      this.workspaces.reset();
      //TODO - flip culture cards when they exist
      this.checkForEndGame();
    },
    checkForEndGame: function() {
      //TODO - check if there are no more culture cards as well
      var gameover = this.buildings.empty(),
        players = this.get('players');
      if (gameover) {
        this.trigger('gameover', players.winner());
      } else {
        players.advanceLeaderToken();
        this.set('phase', 'place');
      }
    }
  });
});
