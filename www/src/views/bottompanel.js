define([
    'jquery',
    'src/views/mobile',
    'src/views/workspace',
    'src/views/production-track'
  ], function($, MobileView, WorkspaceView, ProductionTrackView) {
  return MobileView.extend({
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
