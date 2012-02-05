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
      this.tools = new Tools();
      this.bind('change:workers', this._capWorkers, this);
      this.bind('change:production', this._capProduction, this);
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
          this.set('food', 0);
          this.subtract('score', 10);
        } else {
          this.set('deficit', deficit);
          this.trigger('deficit');
        }
      } else {
        this.set('deficit', 0);
        this.set('food', food);
        this.trigger('fed');
      }
    },
    resourceCount: function() {
      return this.get('wood') +
        this.get('brick') +
        this.get('stone') +
        this.get('gold');
    },
    kinds: function() {
      return (this.get('wood') > 0 ? 1 : 0) +
        (this.get('brick') > 0 ? 1 : 0) +
        (this.get('stone') > 0 ? 1 : 0) +
        (this.get('gold') > 0 ? 1 : 0);
    },
    _capWorkers: function() {
      if (this.get('workers') > 10) {
        this.set('workers', 10);
      }
    },
    _capProduction: function() {
      if (this.get('production') > 10) {
        this.set('production', 10);
      }
    }
  });
});
