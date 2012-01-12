define([
    'jquery',
    'backbone',
    'src/views/workspace'
  ], function($, Backbone, WorkspaceView) {
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
      }, this);
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
