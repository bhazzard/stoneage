define([
    'src/models/workspace'
  ], function(Workspace) {
  return Workspace.extend({
    initialize: function() {
      this.set({
        name: 'toolhut',
        resource: 'tool',
        value: 1
      });
    },
    canPlace : function(player, count) {
      var workerCount = this.workers() + count;
      return {
        result : workerCount == 1,
        reason : "Only 1 worker allowed in the Toolmaker's hut"
      };
    },
    resolve: function(player) {
      var resourceName = this.get('resource'),
        value = this.get('value'),
        workers = this.workers(player.id);
      this.set(player.id, undefined);
      player.add('workers', workers);
      player.addTool();
      this.trigger('resolve', player);
    }
  });
});
