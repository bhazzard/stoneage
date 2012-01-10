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
      $(this.el).empty().addClass(this.model.get('name'));
      for (var i=1; i<=4; ++i) {
        $('<div/>')
          .addClass('worker-pile player' + i)
          .appendTo(this.el)
          .html(this.model.get(i));
      }
      var cost = this.model.get('cost');
      _(cost).each(function(amount, resource) {
        $('<div/>').html(resource + ': ' + amount).appendTo(this.el);
      }, this);
      return this;
    },
    click: function() {
      //TODO - execute phase for this building
    }
  });
});
