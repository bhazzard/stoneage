define([
    'jquery',
    'src/views/mobile'
  ], function($, MobileView) {
  return MobileView.extend({
    className: 'tool',
    events: {
      'click': 'tap'
    },
    initialize: function() {
      this.model.bind('change:tapped', this.tapped, this);
      this.model.bind('change:value', this.increase, this);
    },
    render: function() {
      this.tapped();
      this.increase();
      return this;
    },
    tapped: function() {
      $(this.el).toggleClass('tapped', this.model.get('tapped'));
    },
    increase: function() {
      $(this.el)
        .removeClass('tool' + this.model.previous('value'))
        .addClass('tool' + this.model.get('value'));
    },
    tap: function() {
      this.model.tap();
    }
  });
});
