define([
    'jquery',
    'backbone'
  ], function($, Backbone) {
  return Backbone.View.extend({
    className: 'tools',
    events: function() {
      return MOBILE ? {
        'tap .tool:not(.tapped)': 'tap'
      } : {
        'click .tool:not(.tapped)': 'tap'
      };
    },
    initialize: function() {
      this.collection.bind('all', this.render, this);
    },
    render: function() {
      $(this.el).empty();
      this.collection.each(function(tool, i) {
        var toolView = $('<div/>')
          .data('tool-index', i)
          .addClass('tool tool' + tool.get('value'));
        if (tool.get('tapped')) {
          toolView.addClass('tapped');
        }
        toolView.appendTo(this.el);
      }, this);
      return this;
    },
    tap: function(e) {
      var i = $(e.target).addClass('tapped').data('tool-index');
      this.collection.at(i).tap();
    }
  });
});
