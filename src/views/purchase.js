define([
    'backbone'
  ], function(Backbone) {
  return Backbone.View.extend({
    className: 'purchase-dialog',
    events: function() {
      return MOBILE ? {
        'tap .yes': 'purchase',
        'tap .no': 'remove'
      } : {
        'click .yes': 'purchase',
        'click .no': 'remove'
      };
    },
    render: function() {
      $(this.el).empty();
      $('<div/>').html('Buy this building?').appendTo(this.el);
      $('<button class="yes">Yes</button>').appendTo(this.el);
      $('<button class="no">No</button>').appendTo(this.el);
      return this;
    },
    purchase: function() {
      this.model.purchase(this.options.player);
      this.remove();
    }
  });
});
