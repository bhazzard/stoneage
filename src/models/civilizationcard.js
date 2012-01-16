define([
    'underscore',
    'backbone',
    'src/models/workspace'
  ], function(_, Backbone, Workspace) {
  return Workspace.extend({
    initialize: function() {
      this.set('name', 'civcard civcard' + this.id);
    },
    canPlace: function(player) {
      return this.workers() === 0 && player.get('workers') > 0;
    },
    place: function(player) {
      Workspace.prototype.place.call(this, player, 1);
    },
    resolve: function(player) {
      var workers = this.workers(player);
      this.set(player.id, undefined);
      player.add('workers', workers);
      this.trigger('resolve', player);
    }
  });
});
