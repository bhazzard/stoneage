define([
    'backbone'
  ], function(Backbone) {
  return Backbone.Model.extend({
		canPlace : function(count){
			if(this._playersOnWorkspace() >= 2){
				return {
					result : false,
					reason : 'Already 2 players on workspace'
				};
			}
			var workerCount = this.workers() + count;
			console.log(workerCount);
			if(workerCount > this.get('maxWorkers')){
				return {
					result : false,
					reason : 'Too many workers on ' + this.get('name')
				};
			}
			return {
				result : true
			};
		},
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
