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
		canPlace : function(player) {
      return this.workers() === 0 && player.get('workers') > 1;
		},
    place: function(player) {
      Workspace.prototype.place.call(this, player, 2);
    },
    resolve: function(player) {
      var workers = this.workers(player.id);
      this.set(player.id, undefined);
      if (workers === 2) {
        player.add('workers', workers + 1);
      }
      this.trigger('resolve', player);
    }
  });
});
