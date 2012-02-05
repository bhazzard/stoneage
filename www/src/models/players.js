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
      this.each(this._onAdd, this);
    },
    gotoLeader: function() {
      if (this.current()) {
        this.current().set('active', false);
      }
      this.active = this.leader;
      this.current().set('active', true);
    },
    advanceLeaderToken: function() {
      this.leader = (this.leader + 1) % this.length;
      this.gotoLeader();
    },
    nextTurn: function() {
      this.current().set('active', false);
      this.active = (this.active + 1) % this.length;
      this.current().set('active', true);
    },
    winner: function() {
      return this.max(function(player) {
        return player.get('score');
      });
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
    resetAll: function() {
      this.each(function(player) {
        player.tools.untapAll();
      });
    },
    _onAdd: function(player, index) {
      player.id = index === undefined ? this.length : index+1;
      player.bind('fed', this._onFed, this);
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
