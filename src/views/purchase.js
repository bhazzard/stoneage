define([
    'src/views/mobile'
  ], function(MobileView) {
  return MobileView.extend({
    className: 'dialog small',
    events: {
      'click .ok': 'purchase',
      'click .cancel': 'remove'
    },
    render: function() {
      $(this.el).empty();
      $('<div/>').html('Buy this building?').appendTo(this.el);
      $('<div class="ok button"/>').appendTo(this.el);
      $('<div class="cancel button"/>').appendTo(this.el);
      return this;
    },
    purchase: function() {
      this.model.purchase(this.options.player);
      this.remove();
    }
  });
});
