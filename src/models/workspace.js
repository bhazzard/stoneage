define([
    'backbone'
  ], function(Backbone) {
  return Backbone.Model.extend({
		canPlace : function(player, count){
			if(this.workers(player.id) > 0){
        //Already on this workspace
        return false;
			}
      //TODO - won't necessarily be correct for 2/3 players
			if(this._playersOnWorkspace() >= 2){
        //Already 2 players on the workspace
        return false;
			}
      return this.workers() < this.get('maxWorkers');
		},
    place: function(player, count) {
      if (count) {
        player.subtract('workers', count);
        this.set(player.id, count);
        this.trigger('place');
      } else {
        this.trigger('howmany', this);
      }
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
    reset: function() {
      //no-op
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
    },
		_playersOnWorkspace : function(){
			var i, count;
			for(i=1; i <=4; ++i){
				if(this.get(i) > 0){
					count++;
				}
			}
			return count;
		}
  });
});
