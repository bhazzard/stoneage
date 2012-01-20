define([
    'jquery',
    'src/views/mobile'
  ], function($, MobileView) {
  return MobileView.extend({
    className: 'feeding-dialog',
    events: {
      'click .ok': 'feed',
      'click .up': 'up',
      'click .down': 'down',
      'click :radio': 'checkDeficit'
    },
    initialize: function() {
      this.model.bind('deficit', this.render, this);
    },
    render: function() {
      var template = [
        '<p>Player ' + this.model.id + ' you have ' + this.model.get('deficit') + ' starving workers. How will you feed them?</p>',
        '<div>' +
          '<div><label><input type="radio" name="feed" value="score" checked="checked" /> Lose 10 points</label></div>',
          '<div><label><input type="radio" name="feed" value="resources" /> Lose resources</label></div>',
          '<div>Wood: <button class="down">-</button><input type="text" name="wood" value="0" /><button class="up">+</button></div>' +
          '<div>Brick: <button class="down">-</button><input type="text" name="brick" value="0" /><button class="up">+</button></div>' +
          '<div>Stone: <button class="down">-</button><input type="text" name="stone" value="0" /><button class="up">+</button></div>' +
          '<div>Gold: <button class="down">-</button><input type="text" name="gold" value="0" /><button class="up">+</button></div>' +
        '</div>' +
        '<button class="ok">Ok</button>'
      ];
      $(this.el).html(template.join(''));
      $(this.el).appendTo('body');

      this.checkDeficit();

      //I'm not sure why we need to call this here.
      //I guess .remove() undelegates, but nothing
      //ever re-delegates...
      this.delegateEvents(this.events);
    },
    feed: function() {
      var resources = {};
      if ($(':radio:checked', this.el).val() === 'score') {
        this.model.feed('score');
      } else {
        $(':text', this.el).each(function() {
          resources[$(this).attr('name')] = Number($(this).val());
        });
        this.model.feed(resources);
      }
      this.remove();
    },
    up: function(event) {
      var text = $(event.target).siblings(':text'),
        count = Number(text.val());
      if (count < this.model.get(text.attr('name'))) {
        text.val(count + 1);
        this.checkDeficit();
      }
    },
    down: function(event) {
      var text = $(event.target).siblings(':text'),
        count = Number(text.val());
      if (count > 0) {
        text.val(count - 1);
        this.checkDeficit();
      }
    },
    checkDeficit: function() {
      if ($(':radio:checked', this.el).val() === 'score') {
        $('.ok', this.el).attr('disabled', false);
        $('.up,.down,:text', this.el).attr('disabled', true);
      } else {
        var total = 0;
        $('.up,.down,:text', this.el).attr('disabled', false);
        $(':text', this.el).each(function() {
          total += Number($(this).val());
        });
        $('.ok', this.el).attr('disabled', total !== this.model.get('deficit'));
        $('.up', this.el).attr('disabled', total === this.model.get('deficit'));
      }
    }
  });
});
