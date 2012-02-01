define([
    'backbone',
    'src/models/workspace'
  ], function(Backbone, Workspace) {
  return Backbone.Collection.extend({
    model: Workspace,
    initialize: function() {
      this.bind('add', this._onAdd, this);
    },
    reset: function() {
      this.each(function(workspace) {
        workspace.reset();
      });
    },
    toResolve: function(player) {
      return this.reduce(function(memo, workspace) {
        if (player) {
          return memo + workspace.workers(player);
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
});
