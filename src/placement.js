define(function() {
	function Placement(player, workspace, workers) {
		this.player = player;
		this.workspace = workspace;
		this.workers = workers;
	};
	
	Placement.prototype.execute = function() {
		if (this.isValid()) {
			this.workspace.placement(this);
			this.player.placement(this);
		}
	}
	
	Placement.prototype.isValid = function() {
		return this.workspace.canPlace(this) && this.player.canPlace(this);
	}
	
	return Placement;
});