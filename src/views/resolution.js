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

      this.options.player.get('tools').each(function(tool) {
        if (!tool.get('tapped')) {
          var toolOption = $('<input />').attr('value', tool.get('value')).attr('type', 'checkbox');
          $(this.el).append(toolOption).append(tool.get('value'));
        }
      }, this);

      $('<button class="ok">Ok</button>').appendTo(this.el);
      return this;
    },
    resolve: function() {
      this.model.resolve(
        this.options.player,
        this.options.dice.sum + _($(this.el).find('input:checked')).reduce(function(memo, el) { return memo + Number($(el).attr('value')); }, 0));
      this.remove();
    }
  });
});
