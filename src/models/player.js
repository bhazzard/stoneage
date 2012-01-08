define([
    'backbone'
  ], function(Backbone) {
  return Backbone.Model.extend({
    defaults: {
      workers: 5,
      food: 12,
      production: 0,
      wood: 0,
      brick: 0,
      stone: 0,
      gold: 0
    },
    place: function(workspace, count) {
      var workers = this.get('workers');
      count = count || 1;
      count = Math.min(count, workers);
      this.set('workers', workers - count);
      workspace.place(this, count);
      this.trigger('place');
    },
    addWorkers: function(count) {
      this.set('workers', this.get('workers') + count);
    },
    addResource: function(resource, count) {
      this.set(resource, this.get(resource) + count);
    },
    feed: function() {
      var food = this.get('food') + this.get('production'),
        workers = this.get('workers');
      food -= workers;
      if (workers < 0) {
        //TODO - need to handle the case where there is not enough food
      } else {
        this.set('food', food);
        this.trigger('fed');
      }
    }
  });
});
