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
          '<div><label><input type="radio" name="feed" class="score" checked="checked" /> Lose 10 points</label></div>',
          '<div><label><input type="radio" name="feed" class="resources" /> Lose resources</label></div>',
          '<div>Wood: <button class="wood">-</button><span class="wood">0</span><button class="wood">+</button></div>' +
          '<div>Brick: <button class="brick">-</button><span class="brick">0</span><button class="brick">+</button></div>' +
          '<div>Stone: <button class="stone">-</button><span class="stone">0</span><button class="stone">+</button></div>' +
          '<div>Gold: <button class="gold">-</button><span class="gold">0</span><button class="gold">+</button></div>' +
        '</div>' +
        '<button class="ok">Ok</button>'
      ];
      $(this.el).html(template.join(''));
      $(this.el).appendTo('body');

      //I'm not sure why we need to call this here.
      //I guess .remove() undelegates, but nothing
      //ever re-delegates...
      this.delegateEvents(this.events);
    },
    feed: function() {
      if ($('.score', this.el).is(':checked')) {
        this.model.feed('score');
      }
      this.remove();
    }
  });
});
