define([
    'jquery',
    'underscore',
    'src/views/mobile'
  ], function($, _, MobileView) {
  return MobileView.extend({
    className: 'feed',
    events: {
      'click .up': 'up',
      'click .down': 'down'
    },
    initialize: function() {
      this.model.bind('change', this.change, this);
    },
    render: function() {
      _([ 'wood', 'brick', 'stone', 'gold' ]).each(function(resource) {
        var row = $('<div/>').appendTo(this.el);
        $('<button/>').addClass('down').appendTo(row);
        $('<div/>')
          .addClass('resource ' + resource)
          .attr('data-resource', resource)
          .html(0)
          .appendTo(row);
        $('<button/>').addClass('up').appendTo(row);
      }, this);
      return this;
    },
    up: function(event) {
      var text = $(event.target).siblings('.resource'),
        resource = text.attr('data-resource');
      if (this.model.get(resource) < this.options.player.get(resource)) {
        this.model.add(resource, 1);
      }
    },
    down: function(event) {
      var text = $(event.target).siblings('.resource'),
        resource = text.attr('data-resource');
      if (this.model.get(resource) > 0) {
        this.model.subtract(resource, 1);
      }
    },
    change: function() {
      var changed = this.model.changedAttributes();
      _(changed).each(function(amount, resource) {
        $('.resource.' + resource, this.el).html(amount);
      }, this);
    }
  });
});
