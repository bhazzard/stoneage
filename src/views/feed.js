define([
    'jquery',
    'src/views/mobile',
    'src/views/payment',
    'src/models/payment',
    'src/models/cost'
  ], function($, MobileView, PaymentView, Payment, Cost) {
  return MobileView.extend({
    className: 'medium dialog',
    events: {
      'click .points': 'points',
      'click .ok': 'feed',
      'met': 'met'
    },
    initialize: function() {
      this.model.bind('deficit', this.render, this);
      this.payment = new Payment();
    },
    render: function() {
      $('<p/>').html('You have ' + this.model.get('deficit') + ' starving workers. How will you feed them?').appendTo(this.el);
      this.cost = new Cost({ any: this.model.get('deficit') });
      var view = new PaymentView({
        model: this.payment,
        player: this.model,
        cost: this.cost
      });
      $(view.render().el).appendTo(this.el);
      $('<button/>').addClass('points').appendTo(this.el);
      $('<button/>').attr('disabled', true).addClass('ok').appendTo(this.el);
      $(this.el).appendTo('body');

      //I'm not sure why we need to call this here.
      //I guess .remove() undelegates, but nothing
      //ever re-delegates...
      this.delegateEvents(this.events);
    },
    feed: function() {
      this.model.feed(this.payment.toJSON());
      this.remove();
    },
    points: function() {
      this.model.feed('score');
      this.remove();
    },
    met: function(event, met) {
      $('.ok', this.el).attr('disabled', !met);
    }
  });
});
