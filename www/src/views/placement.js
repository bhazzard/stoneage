define([
    'jquery',
    'src/views/mobile'
  ], function($, MobileView) {
  return MobileView.extend({
    className: 'placement small dialog',
    events: {
      'click .ok': 'place',
      'click .cancel': 'remove',
      'click .meeple:not(.shadow)': 'select'
    },
    render: function() {
      $(this.el).empty();
      var meeples = $('<div class="meeples" />').appendTo(this.el),
        player = this.options.player,
        meeple;
      for (var i=0; i<10; ++i) {
        meeple = $('<div class="meeple player' + player.id + '" />').appendTo(meeples);
        if (i > 0) {
          meeple.addClass('ghost');
        }
        if (i >= player.get('workers')) {
          meeple.addClass('shadow');
        }
      }
      $('<input type="hidden" value="1" />').appendTo(this.el);
      $('<button class="ok"/>').appendTo(this.el);
      $('<button class="cancel"/>').appendTo(this.el);
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
