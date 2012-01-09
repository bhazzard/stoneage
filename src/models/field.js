define([
    'src/models/workspace'
  ], function(Workspace) {
  return Workspace.extend({
    initialize: function() {
      this.set({
        name: 'field',
        resource: 'production',
        value: 1
      });
    },
		canPlace : function(player, count) {
			var workerCount = this.workers() + count;
			return {
				result : workerCount == 1,
				reason : 'Only 1 worker allowed on field'
			};
		},
    resolve: function(player) {
      var resourceName = this.get('resource'),
        value = this.get('value'),
        workers = this.workers(player.id);
      this.set(player.id, undefined);
      player.add('workers', workers);
      player.add(resourceName, 1);
      this.trigger('resolve', player);
    }
  });
});
