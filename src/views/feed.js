define([
    'jquery',
    'src/views/mobile',
    'src/views/resource'
  ], function($, MobileView, ResourceView) {
  return MobileView.extend({
    className: 'medium dialog',
    events: {
      'click .points': 'points',
      'click .ok': 'feed',
      'click .up': 'up',
      'click .down': 'down'
    },
    initialize: function() {
      this.model.bind('deficit', this.render, this);
    },
    render: function() {
      $('<p/>').html('You have ' + this.model.get('deficit') + ' starving workers. How will you feed them?').appendTo(this.el);
      var view = new ResourceView();
      $(view.render().el).appendTo(this.el);
      $('<div/>').addClass('points button').html('Lose 10 Points').appendTo(this.el);
      $('<div/>').addClass('ok button').appendTo(this.el);
      $(this.el).appendTo('body');

      this.checkDeficit();

      //I'm not sure why we need to call this here.
      //I guess .remove() undelegates, but nothing
      //ever re-delegates...
      this.delegateEvents(this.events);
    },
    feed: function() {
      var resources = {};
      $('.resource', this.el).each(function() {
        resources[$(this).attr('data-resource')] = Number($(this).text());
      });
      this.model.feed(resources);
      this.remove();
    },
    points: function() {
      this.model.feed('score');
      this.remove();
    },
    up: function(event) {
      var text = $(event.target).siblings('.resource'),
        count = Number(text.text());
      if (count < this.model.get(text.attr('data-resource'))) {
        text.text(count + 1);
        this.checkDeficit();
      }
    },
    down: function(event) {
      var text = $(event.target).siblings('.resource'),
        count = Number(text.text());
      if (count > 0) {
        text.text(count - 1);
        this.checkDeficit();
      }
    },
    checkDeficit: function() {
      var total = 0;
      $('.up,.down', this.el).attr('disabled', false);
      $('.resource', this.el).each(function() {
        total += Number($(this).text());
      });
      $('.ok', this.el).attr('disabled', total !== this.model.get('deficit'));
      $('.up', this.el).attr('disabled', total === this.model.get('deficit'));
    }
  });
});
