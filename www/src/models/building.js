define([
    'underscore',
    'backbone',
    'src/models/workspace'
  ], function(_, Backbone, Workspace) {
  return Workspace.extend({
    initialize: function() {
      var cost = this.get('cost');
      if (cost) {
        this.unset('cost');
        this.cost = cost;
      }
    },
    canPurchase: function(player) {
      return this.cost.canAfford(player);
    },
    purchase: function(player, payment) {
      payment.execute(player);
      this.get('buildings').remove(this);
      player.add('score', payment.value());
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
