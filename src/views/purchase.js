define([
    'src/views/mobile'
  ], function(MobileView) {
  return MobileView.extend({
    className: 'purchase-dialog',
    events: {
      'click .yes': 'purchase',
      'click .no': 'remove'
    },
    render: function() {
      $(this.el).empty();
      $('<div/>').html('Buy this building?').appendTo(this.el);
      $('<button class="yes">Yes</button>').appendTo(this.el);
      $('<button class="no">No</button>').appendTo(this.el);
      return this;
    },
    purchase: function() {
      this.model.purchase(this.options.player);
      this.remove();
    }
  });
});
