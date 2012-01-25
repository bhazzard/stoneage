define([
    'underscore',
    'backbone'
  ], function(_, Backbone) {
  var resources = ['wood', 'brick', 'stone', 'gold'];
 
  return Backbone.Model.extend({
    met: function(payment) {
      var any = this.get('any');
      if (any !== undefined) {
        return payment.total() >= any;
      }
      return false;
    },
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
