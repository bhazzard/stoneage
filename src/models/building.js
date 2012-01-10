define([
    'src/models/workspace'
  ], function(Workspace) {
  return Workspace.extend({
		canPlace : function(player, count) {
			var workerCount = this.workers() + count;
			return {
				result : workerCount == 1,
				reason : 'Only 1 worker allowed on a building'
			};
		},
    resolve: function(player) {
      var resourceName = this.get('resource'),
        value = this.get('value'),
        workers = this.workers(player.id);
      this.set(player.id, undefined);
      player.add('workers', workers);
      //TODO - need to prompt the player to see if they want
      //       to pay the resource cost to obtain the building.
      //       the prompt may not belong here though, note the event...
      this.trigger('resolve', player);
    }
  });
});
