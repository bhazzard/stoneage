define([
    'jquery',
    'backbone'
  ], function($, Backbone) {
  return Backbone.View.extend({
    className: 'production-marker',
    initialize: function() {
      this.model.bind('change', this.update, this);
    },
    render: function() {
      $(this.el).addClass('player-' + this.model.id);
	  this.options.track.placeMarker(this, 0);
	  return this;
    },
	update: function() {
	  this.options.track.placeMarker(this, this.model.get('production'));
	}
  });
});