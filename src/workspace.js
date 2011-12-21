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
	
	Workspace.prototype.placement = function(placement) {
		this._placements[placement.player.id] = placement.workers;
		this.capacity(this.capacity() - placement.workers);
	};
	
	Workspace.prototype.workersFor = function(player, workers) {
		return this._placements[player.id];
	}
	
	Workspace.prototype.canPlace = function(placement) {
		return this.capacity() >= placement.workers;
	}
	
	return Workspace;
});