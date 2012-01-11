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
      var buildings = new Buildings();
      var workspaces = new Workspaces();
      workspaces.add([
        new Hunt(),
        new Workspace({
          name: 'forest',
          resource: 'wood',
          value: 3,
          maxWorkers : 7
        }),
        new Workspace({
          name: 'claypit',
          resource: 'brick',
          value: 4,
          maxWorkers : 7
        }),
        new Workspace({
          name: 'quary',
          resource: 'stone',
          value: 5,
          maxWorkers : 7
        }),
        new Workspace({
          name: 'river',
          resource: 'gold',
          value: 6,
          maxWorkers : 7
        }),
        new Field(),
        new SpecialHut(),
        new ToolHut()
      ]);
      workspaces.add(buildings.get('piles'));
      this.workspaces = workspaces;
      this.buildings = buildings;

      this.get('players').bind('resolve', function() {
        this.get('players').gotoLeader();
        this.set('phase', 'resolve');
      }, this);
      this.workspaces.bind('playerresolved', function() {
        this.get('players').nextTurn();
      }, this);
      this.workspaces.bind('allresolved', function() {
        this.feed();
      }, this);
      this.get('players').bind('allfed', function() {
        this.reset();
      }, this);
    },
    activate: function(workspace) {
      this[this.get('phase')](workspace);
    },
    place: function(workspace) {
      var player = this.get('players').current(),
        workers = prompt('Player ' + player.id + ', how many workers?');

			workers = parseInt(workers);
			var specResult = workspace.canPlace(player, workers);
			if(specResult.result){
      	player.place(workspace, workers);
			} else {
				alert(specResult.reason);
				this.place(workspace);
			}
    },
    resolve: function(workspace) {
      var player = this.get('players').current();
      workspace.resolve(player);
    },
    feed: function() {
      this.get('players').feed();
    },
    reset: function() {
      //TODO - pass through until we have cards/buildings to flip
      this.determineWinner();
    },
    determineWinner: function() {
      //TODO - check if a building card pile is empty, or if there are no more culture cards
      var winner = false;
      if (winner) {
        //TODO - will not execute until there are cards/buildings to score
      } else {
        this.get('players').advanceLeaderToken();
        this.set('phase', 'place');
      }
    }
  });
});
