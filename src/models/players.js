define([
    'backbone',
    'src/models/player'
  ], function(Backbone, Player) {
  return Backbone.Collection.extend({
    model: Player,
    initialize: function() {
      this.leader = 0;
      this.gotoLeader();
      this.bind('add', this._onAdd, this);
    },
    gotoLeader: function() {
      this.active = this.leader;
    },
    advanceLeaderToken: function() {
      this.leader = (this.leader + 1) % this.length;
      this.gotoLeader();
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
    feed: function() {
      this.gotoLeader();
      this.current().feed();
    },
    _onAdd: function(player) {
      player.id = this.length;
      player.bind('place', this._onPlace, this);
      player.bind('fed', this._onFed, this);
    },
    _onPlace: function() {
      this.nextTurn();
      if (this.remainingWorkers() === 0) {
        this.trigger('resolve');
      }
    },
    _onFed: function() {
      this.nextTurn();
      if (this.active === this.leader) {
        this.trigger('allfed');
      } else {
        this.current().feed();
      }
    }
  });
});
