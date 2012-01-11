define([
    'jquery',
    'backbone'
  ], function($, Backbone) {
  return Backbone.View.extend({
    className: 'workspace',
    events: {
      'click': 'click'
    },
    initialize: function() {
      this.model.bind('change', this.render, this);
    },
    render: function() {
      $(this.el).empty()
        .removeClass()
        .addClass(this.className)
        .addClass(this.model.get('name'))
        .addClass(this.model.get('class'));
      for (var i=1; i<=4; ++i) {
        $('<div/>')
          .addClass('worker-pile player' + i)
          .appendTo(this.el)
          .html(this.model.get(i));
      }
      return this;
    },
    click: function() {
      this.options.board.activate(this.model);
    }
  });
});
