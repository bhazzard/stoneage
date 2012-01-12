define([
    'src/models/workspace'
  ], function(Workspace) {
  return Workspace.extend({
    initialize: function() {
      this.flip();
    },
    top: function() {
      return this.get('pile')[0];
    },
		canPlace : function(player) {
      return this.workers() === 0 && player.get('workers') > 0;
		},
    place: function(player) {
      Workspace.prototype.place.call(this, player, 1);
    },
    resolve: function(player) {
      var building = this.top(),
        workers = this.workers(player.id);
      this.set(player.id, undefined);
      player.add('workers', workers);
      if (building.canPurchase(player) && confirm('Buy this building?')) {
        building.purchase(player);
        this.pop();
      }
      this.trigger('resolve', player);
    },
    pop: function() {
      this.get('pile').shift();
      if (this.empty()) {
        this.set('class', 'building-empty');
      } else {
        this.set('class', 'building-back');
      }
    },
    empty: function() {
      return this.get('pile').length === 0;
    },
    reset: function() {
      this.flip();
    },
    flip: function() {
      if (!this.empty()) {
        this.set('class', 'building' + this.top().id);
      }
    }
  });
});
