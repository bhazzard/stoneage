define([
    'jquery',
    'backbone'
  ], function($, Backbone) {
  return Backbone.View.extend({
    className: 'feeding-dialog',
    events: {
      'click .ok': 'feed'
    },
    initialize: function() {
      this.model.bind('deficit', this.render, this);
    },
    render: function() {
      var template = [
        '<p>Player ' + this.model.id + ' you have ' + this.model.get('deficit') + ' starving workers. How will you feed them?</p>',
        '<div>' +
          '<label><input type="radio" name="feed" class="score" checked="checked" /> Lose 10 points</label>',
        '</div>' +
        '<button class="ok">Ok</button>'
      ];
      $(template.join('')).appendTo(this.el);
      $(this.el).appendTo('body');
    },
    feed: function() {
      if ($('.score', this.el).is(':checked')) {
        this.model.feed('score');
      }
      this.remove();
    }
  });
});
