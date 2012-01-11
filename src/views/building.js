define([
    'jquery',
    'underscore',
    'backbone'
  ], function($, _, Backbone) {
  return Backbone.View.extend({
    className: 'building',
    events: {
      'click': 'click'
    },
    initialize: function() {
      this.model.bind('change', this.render, this);
    },
    render: function() {
      $(this.el).empty().addClass('building' + this.model.id);
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
