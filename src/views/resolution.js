define([
    'jquery',
    'underscore',
    'backbone'
  ], function($, _, Backbone) {
  return Backbone.View.extend({
    className: 'resolution-dialog',
    events: {
      'click .ok': 'resolve'
    },
    render: function() {
      $(this.el).empty();
      var roll = $('<div />').addClass('roll').appendTo(this.el);
      _(this.options.dice.dice).each(function(die) {
        $('<div />').addClass('die face' + die).appendTo(roll);
      }, this);
      $('<button class="ok">Ok</button>').appendTo(this.el);
      return this;
    },
    resolve: function() {
      this.model.resolve(
        this.options.player,
        this.options.dice.sum);
      this.remove();
    }
  });
});
