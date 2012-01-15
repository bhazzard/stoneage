define([
    'jquery',
    'underscore',
    'backbone',
    'src/views/tools'
  ], function($, _, Backbone, ToolsView) {
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

      var tools = new ToolsView({
        collection: this.options.player.get('tools')
      });
      $(tools.render().el).appendTo(this.el);

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
