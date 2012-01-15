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
    canPlace : function(player) {
      return this.workers() === 0 && player.get('workers') > 0;
    },
    place: function(player) {
      Workspace.prototype.place.call(this, player, 1);
    },
    resolve: function(player) {
      var resourceName = this.get('resource'),
        value = this.get('value'),
        workers = this.workers(player);
      this.set(player.id, undefined);
      player.add('workers', workers);
      player.get('tools').upgrade();
      this.trigger('resolve', player);
    }
  });
});
