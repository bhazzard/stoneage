define([
    'jquery',
    'backbone',
    'src/views/workspace',
    'src/views/buildings'
  ], function($, Backbone, WorkspaceView, BuildingsView) {
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
      var view = new BuildingsView({
        model: this.model.buildings
      });
      $(view.render().el).appendTo(this.el);
      return this;
    }
  });
});
