define([
    'jquery',
    'backbone'
  ], function($, Backbone) {
  return Backbone.View.extend({
    className: 'resolution-dialog',
    events: {
      'click .ok': 'resolve'
    },
    render: function() {
      $(this.el).empty();
      $('<div />').html('Rolled' + this.options.dice.sum).appendTo(this.el);
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
