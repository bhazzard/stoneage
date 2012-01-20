define([
    'jquery',
    'src/views/mobile',
    'src/views/tool'
  ], function($, MobileView, ToolView) {
  return MobileView.extend({
    className: 'tools',
    initialize: function() {
      this.collection.bind('add', this.renderTool, this);
    },
    render: function() {
      this.collection.each(this.renderTool, this);
      return this;
    },
    renderTool: function(tool) {
      var toolView = new ToolView({
        model: tool
      });
      $(toolView.render().el).appendTo(this.el);
    }
  });
});
