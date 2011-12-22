define(function() {
	function Player(id) {
		this.id = id;
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

    Player.prototype.reduceWorkers = function(count){
        this.workers(this.workers() - count);
    };

    Player.prototype.addResource = function(resource){
        this._resources.push(resource);
    };
	
	return Player;
});