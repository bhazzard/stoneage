define([
    'jquery',
    'backbone',
    'src/views/workspace',
    'src/views/production-track'
  ], function($, Backbone, WorkspaceView, ProductionTrackView) {
  return Backbone.View.extend({
    className: 'board',
    initialize: function() {
      this.model.bind('gameover', this._gameover, this);
    },
    render: function() {
      this.model.workspaces.each(function(workspace) {
        var view = new WorkspaceView({
          model: workspace,
          board: this.model
        });
        $(view.render().el).appendTo(this.el);
        workspace.view = view;
      }, this);
	  
      var productionTrack = new ProductionTrackView({
        model: this.model.get('players'),
        board: this.el
      });	  
      $(productionTrack.render().el).appendTo(this.el);
	  
      this.model.workspaces.bind('remove', function(workspace) {
        workspace.view.remove();
      });

      return this;
    },
    _gameover: function(player) {
      $('<div/>')
        .addClass('gameover')
        .html('Player ' + player.id + ' wins with ' + player.get('score') + ' points!')
        .appendTo(this.el);
    }
  });
});
