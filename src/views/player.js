define([
    'jquery',
    'backbone'
  ], function($, Backbone) {
  return Backbone.View.extend({
    className: 'player-board',
    initialize: function() {
      this.model.bind('change', this.render, this);
    },
    render: function() {
      var foodLabel = 'Food: ' + this.model.get('food'),
        production = this.model.get('production');
      if (production > 0) {
        foodLabel += '+' + production;
      }
      $(this.el).empty().addClass('player' + this.model.id);
      $('<div/>').addClass('worker-pile').html('Workers: ' + this.model.get('workers')).appendTo(this.el);
      $('<div/>').addClass('resource-pile food').html(foodLabel).appendTo(this.el);
      $('<div/>').addClass('resource-pile wood').html('Wood: ' + this.model.get('wood')).appendTo(this.el);
      $('<div/>').addClass('resource-pile brick').html('Brick: ' + this.model.get('brick')).appendTo(this.el);
      $('<div/>').addClass('resource-pile stone').html('Stone: ' + this.model.get('stone')).appendTo(this.el);
      $('<div/>').addClass('resource-pile gold').html('Gold: ' + this.model.get('gold')).appendTo(this.el);
      return this;
    }
  });
});
