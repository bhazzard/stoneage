define([
    'jquery',
    'src/views/mobile',
    'src/views/tools'
  ], function($, MobileView, ToolsView) {
  return MobileView.extend({
    className: 'player-board',
    initialize: function() {
      this.model.bind('change', this.render, this);
      this.model.bind('change:active', this.active, this);
    },
    events: {
      'click': "toggle"
    },
    render: function() {
      var foodLabel = this.model.get('food');

      $(this.el).empty().addClass('player' + this.model.id);
      this.active();
      $('<div/>').addClass('counter worker-pile').html(this.model.get('workers')).appendTo(this.el);
      $('<div/>').addClass('counter resource-pile food').html(foodLabel).appendTo(this.el);
      var tools = new ToolsView({
        collection: this.model.tools
      });
      $(tools.render().el).addClass('counter').appendTo(this.el);
      $('<div/>').addClass('counter score').html(this.model.get('score')).appendTo(this.el);
      $('<div/>').addClass('counter resource-pile wood').html(this.model.get('wood')).appendTo(this.el);
      $('<div/>').addClass('counter resource-pile brick').html(this.model.get('brick')).appendTo(this.el);
      $('<div/>').addClass('counter resource-pile stone').html(this.model.get('stone')).appendTo(this.el);
      $('<div/>').addClass('counter resource-pile gold').html(this.model.get('gold')).appendTo(this.el);
      return this;
    },
    toggle: function() {
      $(this.el).toggleClass('active');
    },
  	active: function() {
      $(this.el).toggleClass('active', this.model.get('active'));
    }
  });
});
