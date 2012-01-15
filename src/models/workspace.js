define([
    'backbone'
  ], function(Backbone) {
  return Backbone.Model.extend({
    canPlace : function(player, count){
      if(this.workers(player) > 0){
        //Already on this workspace
        return false;
      }
      if(this._playersOnWorkspace() >= this.get('maxPlayers')){
        return false;
      }
      return this.workers() < this.get('maxWorkers');
    },
    place: function(player, count) {
      var maxWorkers = this.get('maxWorkers');
      if (count) {
        if (maxWorkers) {
          count = Math.min(count, maxWorkers - this.workers());
        }
        count = Math.min(count, player.get('workers'));
        player.subtract('workers', count);
        this.set(player.id, count);
        this.trigger('place');
      } else {
        this.trigger('howmany', this);
      }
    },
    resolve: function(player, roll) {
      var resourceName = this.get('resource'),
        value = this.get('value'),
        workers = this.workers(player),
        resourceCount;
      if (roll === undefined) {
        this.trigger('roll', this, player);
      } else {
        this.set(player.id, undefined);
        resourceCount = Math.floor(roll / value);
        player.add('workers', workers);
        player.add(resourceName, resourceCount);
        this.trigger('resolve', player);
      }
    },
    canResolve : function(player){
      return this.workers(player) > 0;
    },
    reset: function() {
      //no-op
    },
    workers: function(player) {
      if (player === undefined) {
        var i, total = 0;
        for (i=1; i<=4; ++i) {
          total += this.workers({ id: i });
        }
        return total;
      } else {
        return this.get(player.id) || 0;
      }
    },
    _playersOnWorkspace: function(){
      var i, count = 0;
      for(i=1; i <=4; ++i){
        if(this.get(i) > 0){
          count++;
        }
      }
      return count;
    }
  });
});
