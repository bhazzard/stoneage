define([
    'underscore',
    'backbone',
    'src/models/tool'
  ], function(_, Backbone, Tool) {
  return Backbone.Collection.extend({
    model: Tool,
    upgrade: function() {
      if (this.size() < 3) {
        this.add(new Tool()); 
      } else {
        var lowestTool = this.min(function(tool) {
          return tool.value();
        });
        lowestTool.upgrade();
      }
    }
  });
});
