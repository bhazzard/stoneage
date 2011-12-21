define(function() {
	function Player(id) {
		this.id = id;
		this._workers = 5;
	};
	
	Player.prototype.placement = function(placement) {
		this.workers(this.workers() - placement.workers);
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
	
	return Player;
});