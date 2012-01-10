define([
    'jquery',
    'backbone',
    'src/views/building'
  ], function($, Backbone, BuildingView) {
  return Backbone.View.extend({
    className: 'buildings',
    render: function() {
      this.collection.each(function(pile, i) {
        var view = new BuildingView({
          model: pile.top()
        });
        $(view.render().el).appendTo(this.el);
      }, this);
      return this;
    }
  });
});
