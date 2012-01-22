define([
    'jquery',
    'underscore',
    'src/views/mobile'
  ], function($, _, MobileView) {
  return MobileView.extend({
    className: 'gameover small dialog',
    render: function() {
      var players = this.collection.sortBy(function(player) {
        return player.get('score');
      }).reverse();
      $('<div/>')
        .html('Player ' + players[0].id + ' wins!')
        .appendTo(this.el);
      var list = $('<ol/>').appendTo(this.el);
      _(players).each(function(player) {
        var li = $('<li/>')
          .addClass('meeple player' + player.id)
          .appendTo(list);
        $('<div/>')
          .addClass('score')
          .html(player.get('score'))
          .appendTo(li);
      }, this);
      return this;
    }
  });
});
