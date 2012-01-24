define([
    'underscore',
    'backbone'
  ], function(_, Backbone) {
  var resources = ['wood', 'brick', 'stone', 'gold'];
 
  return Backbone.Model.extend({
    canAfford: function(player) {
      return _(resources).all(function(resource) {
        return player.get(resource) >= (this.get(resource) || 0);
      }, this);
    },
    isFixed: function() {
      return _(resources).any(function(resource) {
        return this.get(resource) !== undefined;
      }, this);
    }
  });
});
