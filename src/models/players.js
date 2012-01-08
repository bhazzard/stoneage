define([
    'backbone',
    'src/models/player'
  ], function(Backbone, Player) {
  return Backbone.Collection.extend({
    model: Player,
    initialize: function() {
      this.gotoLeader();
      this.bind('add', this._onAdd, this);
    },
    gotoLeader: function() {
      this.active = 0;
    },
    nextTurn: function() {
      this.active = (this.active + 1) % this.length;
    },
    current: function() {
      return this.at(this.active);
    },
    remainingWorkers: function() {
      return this.reduce(function(memo, player) {
        return memo + player.get('workers');
      }, 0);
    },
    _onAdd: function(player) {
      player.id = this.length;
      player.bind('place', this._onPlace, this);
    },
    _onPlace: function() {
      this.nextTurn();
      if (this.remainingWorkers() === 0) {
        this.trigger('resolve');
      }
    }
  });
});
