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

      var tools = this.options.player.get('tools');
      var toolsView = new ToolsView({
        collection: tools
      });
      $(toolsView.render().el).appendTo(this.el);
      
      this.unavailable = tools.reduce(function(memo, tool) {
        return memo + (tool.get('tapped') ? tool.get('value') : 0);
      }, 0);

      $('<button class="ok">Ok</button>').appendTo(this.el);
      return this;
    },
    resolve: function() {
      var tapped = this.options.player.get('tools').reduce(function(memo, tool) {
        return memo + (tool.get('tapped') ? tool.get('value') : 0);
      }, 0) - this.unavailable;

      this.model.resolve(
        this.options.player,
        this.options.dice.sum + tapped);
      this.remove();
    }
  });
});
