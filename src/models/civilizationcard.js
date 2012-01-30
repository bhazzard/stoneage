define([
    'underscore',
    'backbone',
    'src/models/workspace',
    'src/models/cost'
  ], function(_, Backbone, Workspace, Cost) {
  return Workspace.extend({
    initialize: function() {
      this.set('name', 'civcard civcard' + this.id);
      this.bind('change:space', this._changeSpace, this);
    },
    canPurchase: function(player) {
      return player.resourceCount() >= this.get('space');
    },
    purchase: function(player, payment) {
      payment.execute(player);
      this.collection.remove(this);
      this.trigger('resolve', player);
    },
    canPlace: function(player) {
      return this.workers() === 0 && player.get('workers') > 0;
    },
    place: function(player) {
      Workspace.prototype.place.call(this, player, 1);
    },
    resolve: function(player) {
      var workers = this.workers(player);
      this.set(player.id, undefined);
      player.add('workers', workers);
      //Resolve immediately if the player can't afford the card
      if (!this.canPurchase(player)) {
        this.trigger('resolve', player);
      } else {
        this.trigger('purchase', this, player);
      }
    },
    _changeSpace: function(model, space) {
      this.cost = this.cost || new Cost();
      this.cost.set('any', space);
      var name = this.get('name').replace(/ space\d/g, '');
      this.set('name', name + ' space' + space);
    }
  });
});
