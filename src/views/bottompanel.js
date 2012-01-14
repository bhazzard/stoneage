define([
    'jquery',
    'backbone',
    'src/views/workspace',
    'src/views/production-track'
  ], function($, Backbone, WorkspaceView, ProductionTrackView) {
  return Backbone.View.extend({
    className: 'bottom-panel',
    initialize: function() {
    },
    render: function() {
      return this;
    },
    addPlayer: function(player) {
      $(this.el).append(player.render().el);
    }
  });
});
