define([
    'underscore',
    'backbone'
  ], function(_, Backbone) {
  return Backbone.Model.extend({
    defaults: {
      score: 0,
      workers: 5,
      food: 4,//12,
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
    add: function(attribute, count) {
      this.set(attribute, this.get(attribute) + count);
    },
    subtract: function(attribute, count) {
      this.set(attribute, this.get(attribute) - count);
    },
    feed: function(type) {
      var food = 0,
        deficit = 0;
      if (type === undefined) {
        food = this.get('food') + this.get('production') - this.get('workers');
      } else if (type === 'score') {
        this.subtract(type, 10);
      } else {
        _(type).each(function(count, resource) {
          this.subtract(resource, count);
        }, this);
      }
      if (food < 0) {
        deficit = -food;
        if (this.resourceCount() < deficit) {
          this.subtract('score', 10);
        } else {
          this.set('deficit', deficit);
          this.trigger('deficit');
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
