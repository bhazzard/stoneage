define([
    'jquery',
    'underscore',
    'src/views/mobile',
    'src/views/production-marker'
  ], function($, _, MobileView, ProductionMarkerView) {
  return MobileView.extend({
    className: 'production-track',
    render: function() {
      var that = this;
      _(11).times(function() {
        $('<div/>').appendTo(that.el);
      });
	  
      this.model.each(function(player) {
        var productionMarker = new ProductionMarkerView({
          model: player,
          track: this
        });
        productionMarker.render();
      }, this);
	  
      return this;
    },
    placeMarker: function(marker, position) {
      var positionDiv = $(this.el).children().eq(10 - position);
      $(marker.el).appendTo(positionDiv);
    }
  });
});
