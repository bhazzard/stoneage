define([
    'src/models/workspace'
  ], function(Workspace) {
  return Workspace.extend({
    initialize: function() {
      this.set({
        name: 'specialhut',
        resource: 'workers',
        value: 1
      });
    },
    resolve: function(player) {
      var workers = this.workers(player.id);
      this.set(player.id, undefined);
      if (workers === 2) {
        player.addWorkers(workers + 1);
      }
      this.trigger('resolve', player);
    }
  });
});
