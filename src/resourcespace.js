define(['src/workspace'], function(Workspace) {
	return function(capacity) {
		function ResourceSpace(cost) {
			this._cost = cost;
		};
		
		ResourceSpace.prototype = new Workspace(capacity);
		
		ResourceSpace.prototype.tradeWorkersForDice = function(player, dice) {
			dice.quantity(this.workersFor(player));
		};
		
		ResourceSpace.prototype.tradeDiceForResources = function(player, dice) {
			// TODO: figure this out
		};
		
		return ResourceSpace;
	};
});