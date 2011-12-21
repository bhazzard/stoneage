define(function() {
	function Player(id) {
		this.id = id;
		this._workers = 5;
	};
	
	Player.prototype.placement = function(placement) {
		this._workers -= placement.workers;
	};
	
	Player.prototype.canPlace = function(placement) {
		return this._workers >=  placement.workers;
	}
	
	return Player;
});