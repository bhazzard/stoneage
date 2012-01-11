define([
    'underscore',
    'backbone',
  ], function(_, Backbone) {
  return Backbone.Model.extend({
    defaults: {
      value: 1,
      tapped: false 
    },
    value: function() {
      return this.get('value');
    },
    upgrade: function() {
      this.set('value', this.get('value') + 1);
    },
    tap: function() {
      this.set('tapped', true);
    },
    untap: function() {
      this.set('tapped', false);
    }
  });
});
