define([
    'jquery',
    'underscore',
    'src/views/mobile',
    'jquery.mobile.event'
  ], function($, _, MobileView) {
  return MobileView.extend({
    className: 'workspace',
    events: {
      'click': 'click'
    },
    initialize: function() {
      this.model.bind('change:name', this.changeName, this);
      this.model.bind('change', this.render, this);
    },
    render: function() {
      this.changeName();
      this.update();
      return this;
    },
    update: function() {
      var changed = this.model.changedAttributes();
      if (changed) {
        _(changed).chain()
          .keys()
          .filter(function(key) {
            return !isNaN(key);
          })
          .each(function(player) {
            player = Number(player);
            var className = 'player' + player;
            $('.' + className, this.el).remove();
            for (var i=0; i<this.model.get(player) || 0; ++i) {
              $('<div/>')
                .addClass('meeple ' + className)
                .appendTo(this.el);
            }
          }, this);
      }
    },
    changeName: function() {
      $(this.el)
        .removeClass(this.model.previous('name'))
        .addClass(this.model.get('name'));
    },
    click: function(event) {
      event.preventDefault();
      this.options.board.activate(this.model);
    }
  });
});
