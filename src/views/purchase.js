define([
    'src/views/mobile',
    'src/views/payment',
    'src/models/payment'
  ], function(MobileView, PaymentView, Payment) {
  return MobileView.extend({
    className: 'dialog small',
    events: {
      'click .ok': 'purchase',
      'click .cancel': 'remove'
    },
    render: function() {
      $(this.el).empty();
      $('<div/>').addClass(this.model.get('name')).appendTo(this.el);
      this.showPayment();
      $('<button class="ok"/>').appendTo(this.el);
      $('<button class="cancel"/>').appendTo(this.el);
      return this;
    },
    purchase: function() {
      this.model.purchase(this.options.player, this.payment);
      this.remove();
    },
    showPayment: function() {
      //if (this.model.get('cost')) {
      //TODO - Work in progress on civ-card cost
      if (false) {
        this.payment = new Payment();
        var view = new PaymentView({
          model: this.payment,
          player: this.options.player
        });
        $(view.render().el).appendTo(this.el);
      }
    }
  });
});
