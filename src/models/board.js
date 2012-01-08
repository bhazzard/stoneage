define([
    'backbone',
    'src/models/workspace',
    'src/models/workspaces',
    'src/models/field',
    'src/models/specialhut'
  ], function(Backbone, Workspace, Workspaces, Field, SpecialHut) {
  return Backbone.Model.extend({
    defaults: {
      phase: 'place'
    },
    initialize: function() {
      var workspaces = new Workspaces();
      workspaces.add([
        new Workspace({
          name: 'hunt',
          resource: 'food',
          value: 2
        }),
        new Workspace({
          name: 'forest',
          resource: 'wood',
          value: 3
        }),
        new Workspace({
          name: 'claypit',
          resource: 'brick',
          value: 4
        }),
        new Workspace({
          name: 'quary',
          resource: 'stone',
          value: 5
        }),
        new Workspace({
          name: 'river',
          resource: 'gold',
          value: 6
        }),
        new Field(),
        new SpecialHut()
      ]);
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
});
