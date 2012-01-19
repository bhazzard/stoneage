define([
    'jquery',
    'src/views/mobile',
    'jquery.mobile.event'
  ], function($, MobileView) {
  return MobileView.extend({
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
        .addClass(this.model.get('name'));
      var position = 1;
      for (var i=1; i<=4; ++i) {
        for (var j=1; j<=this.model.get(i); ++j) {
          $('<div/>')
            .addClass('meeple player' + i + ' position' + (position++))
            .appendTo(this.el);
        }
      }
      return this;
    },
    click: function(event) {
      event.preventDefault();
      this.options.board.activate(this.model);
    }
  });
});
