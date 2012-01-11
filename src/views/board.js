define([
    'jquery',
    'backbone',
    'src/views/workspace'
  ], function($, Backbone, WorkspaceView) {
  return Backbone.View.extend({
    className: 'board',
    render: function() {
      this.model.workspaces.each(function(workspace) {
        var view = new WorkspaceView({
          model: workspace,
          board: this.model
        });
        $(view.render().el).appendTo(this.el);
      }, this);
      return this;
    }
  });
});
