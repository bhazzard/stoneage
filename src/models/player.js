define([
    'backbone'
  ], function(Backbone) {
  return Backbone.Model.extend({
    defaults: {
      score: 0,
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
    subtractScore: function(count) {
      this.set('score', this.get('score') - count);
    },
    feed: function() {
      var food = this.get('food') + this.get('production'),
        workers = this.get('workers'),
        deficit = 0;
      food -= workers;
      if (food < 0) {
        deficit = -food;
        if (this.resourceCount() < deficit) {
          this.subtractScore(10);
        } else {
          this.trigger('deficit', deficit);
        }
      } else {
        this.set('food', food);
        this.trigger('fed');
      }
    },
    resourceCount: function() {
      return this.get('wood') +
        this.get('brick') +
        this.get('stone') +
        this.get('gold');
    }
  });
});
