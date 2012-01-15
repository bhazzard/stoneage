define([
    'underscore',
    'backbone',
    'src/models/workspace'
  ], function(_, Backbone, Workspace) {
  return Workspace.extend({
    canPurchase: function(player) {
      return _(this.get('cost')).all(function(amount, resource) {
        return player.get(resource) >= amount;
      }, this);
    },
    purchase: function(player) {
      _(this.get('cost')).each(function(amount, resource) {
        player.subtract(resource, amount);
      }, this);
      this.get('buildings').remove(this);
      player.add('score', this.get('value'));
      this.trigger('resolve', player);
    },
    canPlace : function(player) {
      return this.workers() === 0 && player.get('workers') > 0;
    },
    place: function(player) {
      Workspace.prototype.place.call(this, player, 1);
    },
    resolve: function(player) {
      var workers = this.workers(player);
      this.set(player.id, undefined);
      player.add('workers', workers);
      //Resolve immediately if the player cannot afford the building
      if (!this.canPurchase(player)) {
        this.trigger('resolve', player);
      } else {
        this.trigger('purchase', this, player);
      }
    },
    reset: function() {
      //Flip the card
      if (this.get('buildings').onTop(this)) {
        var name = this.get('name');
        name = name.replace('building-back', 'building' + this.id);
        this.set('name', name);
      }
    }
  });
});
