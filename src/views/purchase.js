define([
    'src/views/mobile',
    'src/views/payment',
    'src/models/payment'
  ], function(MobileView, PaymentView, Payment) {
  return MobileView.extend({
    className: 'dialog small purchase',
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
      if (this.payment) {
        this.model.purchase(this.options.player, this.payment.toJSON());
      } else {
        this.model.purchase(this.options.player);
      }
      this.remove();
    },
    showPayment: function() {
      if (this.model.get('resources')) {
        $(this.el).removeClass('small').addClass('medium');
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
