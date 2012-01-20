define([
    'jquery',
    'src/views/mobile'
  ], function($, MobileView) {
  return MobileView.extend({
    className: 'small dialog',
    events: {
      'click .ok': 'place',
      'click .cancel': 'remove',
      'click .meeple': 'select'
    },
    render: function() {
      $(this.el).empty();
      var meeples = $('<div class="meeples" />').appendTo(this.el),
        player = this.options.player,
        meeple;
      for (var i=0; i<player.get('workers'); ++i) {
        meeple = $('<div class="meeple player' + player.id + '" />').appendTo(meeples);
        if (i > 0) {
          meeple.addClass('ghost');
        }
      }
      $('<input type="hidden" value="1" />').appendTo(this.el);
      $('<div class="ok button"/>').appendTo(this.el);
      $('<div class="cancel button"/>').appendTo(this.el);
      return this;
    },
    place: function() {
      var workers = $(':input', this.el).val();
      this.model.place(this.options.player, Number(workers));
      this.remove();
    },
    select: function(event) {
      var worker = $(event.target),
        workers = worker.prevAll().andSelf().removeClass('ghost');
      worker.nextAll().addClass('ghost');
      $(':input', this.el).val(workers.length);
    }
  });
});
