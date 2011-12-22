define(function() {
	function Workspace(capacity) {
		this._capacity = capacity;
		this._placements = {};
	};
	
	Workspace.prototype.capacity = function(capacity) {
		if (capacity) {
			this._capacity = capacity;
		}
		return this._capacity;
	};
	
	Workspace.prototype.place = function(placement) {
		this._placements[placement.player.id] = placement;
		this.capacity(this.capacity() - placement.workers);
        placement.player.workers(placement.player.workers() - placement.workers);
	};
	
	Workspace.prototype.workersFor = function(player) {
		return this._placements[player.id].workers;
	};
	
	Workspace.prototype.canPlace = function(placement) {
		return this.capacity() >= placement.workers;
	};
	
	return Workspace;
});