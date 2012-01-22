define([
    'jquery',
    'underscore',
    'src/views/mobile'
  ], function($, _, MobileView) {
  return MobileView.extend({
    className: 'feed',
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
    }
  });
});
