define([
    'underscore',
    'backbone',
    'src/models/tool'
  ], function(_, Backbone, Tool) {
  return Backbone.Collection.extend({
    model: Tool,
    initialize: function() {
      var that = this;
      _(3).times(function() {
        that.add(new Tool());
      });
    },
    upgrade: function() {
      var lowestTool = this.min(function(tool) {
        return tool.get('value');
      });
      lowestTool.upgrade();
    },
    untapAll: function() {
      this.each(function(tool) {
        tool.untap();
      });
    }
  });
});
