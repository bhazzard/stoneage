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
		canPlace : function(player) {
      return this.workers() === 0 && player.get('workers') > 0;
		},
    place: function(player) {
      Workspace.prototype.place.call(this, player, 1);
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
