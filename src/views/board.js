define([
    'jquery',
    'src/views/mobile',
    'src/views/workspace',
    'src/views/production-track',
    'src/views/gameover'
  ], function($, MobileView, WorkspaceView, ProductionTrackView, GameOverView) {
  return MobileView.extend({
    className: 'board',
    initialize: function() {
      this.model.bind('gameover', this._gameover, this);
    },
    render: function() {
      this.model.workspaces.each(this._renderWorkspace, this);

      var productionTrack = new ProductionTrackView({
        model: this.model.get('players'),
        board: this.el
      });
      $(productionTrack.render().el).appendTo(this.el);
	  
      this.model.workspaces.bind('remove', function(workspace) {
        workspace.view.remove();
      });
      this.model.workspaces.bind('add', this._renderWorkspace, this);

      $('<div/>').addClass('tool tool1').appendTo(this.el);
      $('<div/>').addClass('tool tool3').appendTo(this.el);

      return this;
    },
    _gameover: function(player) {
      var view = new GameOverView({
        collection: this.model.get('players')
      });
      $(view.render().el).appendTo(this.el);
    },
    _renderWorkspace: function(workspace) {
      var view = new WorkspaceView({
        model: workspace,
        board: this.model
      });
      $(view.render().el).appendTo(this.el);
      workspace.view = view;
    }
  });
});
