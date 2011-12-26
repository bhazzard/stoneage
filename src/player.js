define(function() {
   function Player(color) {
      this._color = color;
      this._workers = 5;
      this._resources = [];
   };

   Player.prototype.canPlace = function(placement) {
      return this.workers() >=  placement.workers;
   };

   Player.prototype.workers = function(workers) {
      if (workers) {
         this._workers = workers;
      }
      return this._workers;
   };

   Player.prototype.increaseWorkers = function(count){
      this.workers(this.workers() + count);
   };

   Player.prototype.reduceWorkers = function(count){
      this.workers(this.workers() - count);
   };

   Player.prototype.addResource = function(resource){
      this._resources.push(resource);
   };

   Player.prototype.resourceCount = function() {
      return this._resources.length;
   };

   return Player;
});
