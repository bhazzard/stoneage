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
      $('<div/>').addClass(this.model.get('name')).appendTo(this.el);
      $('<button class="ok"/>').appendTo(this.el);
      $('<button class="cancel"/>').appendTo(this.el);
      return this;
    },
    purchase: function() {
      this.model.purchase(this.options.player);
      this.remove();
    }
  });
});
