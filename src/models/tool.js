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
      var value = this.get('value');

      if (value < 4) {
        this.set('value', value + 1);
      }
    },
    tap: function() {
      this.set('tapped', true);
    },
    untap: function() {
      this.set('tapped', false);
    }
  });
});
