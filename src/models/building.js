define([
    'underscore',
    'backbone'
  ], function(_, Backbone) {
  return Backbone.Model.extend({
    canPurchase: function(player) {
      //TODO - actually check...
      return true;
    },
    purchase: function(player) {
      _(this.get('cost')).each(function(amount, resource) {
        player.subtract(resource, amount);
      }, this);
      //TODO - add score
    }
  });
});
