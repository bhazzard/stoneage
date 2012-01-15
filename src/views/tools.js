define([
    'jquery',
    'backbone'
  ], function($, Backbone) {
  return Backbone.View.extend({
    className: 'tools',
    initialize: function() {
      this.collection.bind('all', this.render, this);
    },
    render: function() {
      $(this.el).empty();
      this.collection.each(function(tool) {
        var toolView = $('<div/>').addClass('tool tool' + tool.get('value'));
        if (tool.get('tapped')) {
          toolView.addClass('tapped');
        }
        toolView.appendTo(this.el);
      }, this);
      return this;
    }
  });
});
