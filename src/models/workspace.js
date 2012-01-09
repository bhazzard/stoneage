define([
    'backbone'
  ], function(Backbone) {
  return Backbone.Model.extend({
    place: function(player, count) {
      var current = this.workers(player.id);
      this.set(player.id, current + count);
    },
    resolve: function(player) {
      var roll = 0,
        resourceName = this.get('resource'),
        value = this.get('value'),
        workers = this.workers(player.id);
      for (var i=0; i<workers; i++) {
        roll += Math.round(Math.random() * 6) + 1;
      }
      this.set(player.id, undefined);
      var resourceCount = Math.floor(roll / value);
      player.add('workers', workers);
      player.add(resourceName, resourceCount);
      alert('Player ' + player.id + ' rolled ' + roll + ' and got ' + resourceCount +' ' + resourceName);
      this.trigger('resolve', player);
    },
    workers: function(playerId) {
      if (playerId === undefined) {
        var i, total = 0;
        for (i=1; i<=4; ++i) {
          total += this.workers(i);
        }
        return total;
      } else {
        return this.get(playerId) || 0;
      }
    }
  });
});
