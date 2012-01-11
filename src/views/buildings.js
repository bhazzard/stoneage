define([
    'jquery',
    'underscore',
    'backbone',
    'src/views/building'
  ], function($, _, Backbone, BuildingView) {
  return Backbone.View.extend({
    className: 'buildings',
    render: function() {
      var piles = this.model.get('piles');
      _(piles).each(function(pile, i) {
        var view = new BuildingView({
          model: pile.top()
        });
        $(view.render().el).appendTo(this.el);
      }, this);
      return this;
    }
  });
});
