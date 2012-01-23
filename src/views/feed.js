define([
    'jquery',
    'src/views/mobile',
    'src/views/resource',
    'src/models/payment'
  ], function($, MobileView, ResourceView, Payment) {
  return MobileView.extend({
    className: 'medium dialog',
    events: {
      'click .points': 'points',
      'click .ok': 'feed'
    },
    initialize: function() {
      this.model.bind('deficit', this.render, this);
      this.payment = new Payment();
      this.payment.bind('change', this.checkDeficit, this);
    },
    render: function() {
      $('<p/>').html('You have ' + this.model.get('deficit') + ' starving workers. How will you feed them?').appendTo(this.el);
      var view = new ResourceView({
        model: this.payment,
        player: this.model
      });
      $(view.render().el).appendTo(this.el);
      $('<button/>').addClass('points').appendTo(this.el);
      $('<button/>').addClass('ok').appendTo(this.el);
      $(this.el).appendTo('body');

      this.checkDeficit();

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
    checkDeficit: function() {
      var total = this.payment.total();
      $('.up,.down', this.el).attr('disabled', false);
      $('.ok', this.el).attr('disabled', total !== this.model.get('deficit'));
      $('.up', this.el).attr('disabled', total === this.model.get('deficit'));
    }
  });
});
