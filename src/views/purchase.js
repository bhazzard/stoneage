define([
    'src/views/mobile',
    'src/views/payment',
    'src/models/payment'
  ], function(MobileView, PaymentView, Payment) {
  return MobileView.extend({
    className: 'dialog small purchase',
    events: {
      'click .ok': 'purchase',
      'click .cancel': 'remove',
      'met': 'met'
    },
    render: function() {
      var cost = this.model.get('cost');
      $(this.el).empty();
      $('<div/>').addClass(this.model.get('name')).appendTo(this.el);
      if (cost) {
        if (!cost.isFixed()) {
          $(this.el).removeClass('small').addClass('medium');
          this.payment = new Payment();
          var view = new PaymentView({
            model: this.payment,
            player: this.options.player,
            cost: cost
          });
          $(view.render().el).appendTo(this.el);
          $('<button/>').addClass('ok').attr('disabled', true).appendTo(this.el);
        } else {
          this.payment = new Payment(cost.toJSON());
          $('<button/>').addClass('ok').appendTo(this.el);
        }
      }
      $('<button/>').addClass('cancel').appendTo(this.el);
      return this;
    },
    purchase: function() {
      this.model.purchase(this.options.player, this.payment);
      this.remove();
    },
    met: function(event, met) {
      $('.ok', this.el).attr('disabled', !met);
    }
  });
});
