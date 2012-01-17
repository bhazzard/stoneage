define([
    'jquery',
    'backbone',
    'src/views/tools'
  ], function($, Backbone, ToolsView) {
  return Backbone.View.extend({
    className: 'player-board',
    initialize: function() {
      this.model.bind('change', this.render, this);
      this.model.bind('active', this.active, this);
      this.model.bind('notactive', this.notactive, this);
    },
    events: {
      'click': "toggle"
    },
    render: function() {
      var foodLabel = this.model.get('food');

      $(this.el).empty().addClass('player' + this.model.id);
      $('<div/>').addClass('counter worker-pile').html(this.model.get('workers')).appendTo(this.el);
      $('<div/>').addClass('counter resource-pile food').html(foodLabel).appendTo(this.el);
      var tools = new ToolsView({
        collection: this.model.get('tools')
      });
      $(tools.render().el).addClass('counter').appendTo(this.el);
      tools.undelegateEvents();
      $('<div/>').addClass('counter score').html(this.model.get('score')).appendTo(this.el);
      $('<div/>').addClass('counter resource-pile wood').html(this.model.get('wood')).appendTo(this.el);
      $('<div/>').addClass('counter resource-pile brick').html(this.model.get('brick')).appendTo(this.el);
      $('<div/>').addClass('counter resource-pile stone').html(this.model.get('stone')).appendTo(this.el);
      $('<div/>').addClass('counter resource-pile gold').html(this.model.get('gold')).appendTo(this.el);
      return this;
    },
    toggle: function() {
      var bottom = $(this.el).css('bottom');
      if (bottom === '0px') {
        this.active();
      } else {
       this.notactive();
      }
    },
  	active: function() {
        $(this.el).animate({'bottom': '50px' }, 'fast');
    },
    notactive: function() {
      $(this.el).animate({'bottom': '0px' }, 'fast');
    }
  });
});
