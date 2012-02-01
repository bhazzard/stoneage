define([
    'underscore',
    'backbone'
  ], function(_, Backbone) {
  return Backbone.Model.extend({
    defaults: {
      wood: 0,
      brick: 0,
      stone: 0,
      gold: 0
    },
    add: function(attribute, amount) {
      var current = this.get(attribute);
      this.set(attribute, current + amount);
    },
    subtract: function(attribute, amount) {
      var current = this.get(attribute);
      this.set(attribute, current - amount);
    },
    total: function() {
      return this.get('wood') +
        this.get('brick') +
        this.get('stone') +
        this.get('gold');
    },
    execute: function(player) {
      _(this.toJSON()).each(function(amount, resource) {
        player.subtract(resource, amount);
      }, this);
    }
  });
});
