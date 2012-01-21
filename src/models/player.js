define([
    'underscore',
    'backbone',
    'src/models/tools'
  ], function(_, Backbone, Tools) {
  return Backbone.Model.extend({
    defaults: {
      active: false,
      score: 0,
      workers: 5,
      food: 12,
      production: 0,
      tools: undefined,
      wood: 0,
      brick: 0,
      stone: 0,
      gold: 0
    },
    initialize: function() {
      this.set('tools', new Tools());
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
