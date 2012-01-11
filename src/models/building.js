define([
    'underscore',
    'backbone'
  ], function(_, Backbone) {
  return Backbone.Model.extend({
    canPurchase: function(player) {
      return _(this.get('cost')).all(function(amount, resource) {
        return player.get(resource) >= amount;
      }, this);
    },
    purchase: function(player) {
      _(this.get('cost')).each(function(amount, resource) {
        player.subtract(resource, amount);
      }, this);
      player.add('score', this.get('value'));
    }
  });
});
