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
        this.reduceCapacity(placement.workers);
        placement.player.reduceWorkers(placement.workers);
		this._placements[placement.player.id] = placement;
	};
	
    Workspace.prototype.reduceCapacity = function(count){
		this.capacity(this.capacity() - count);        
    };

	Workspace.prototype.workersFor = function(player) {
		return this._placements[player.id].workers;
	};
	
	Workspace.prototype.canPlace = function(placement) {
		return this.capacity() >= placement.workers;
	};
	
	return Workspace;
});