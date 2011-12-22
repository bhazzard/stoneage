define(['src/workspace', 'src/cup', 'src/resource'], function(Workspace, Cup, Resource) {
	return function(capacity) {
		function ResourceSpace(costPerResource) {
			this._costPerResource = costPerResource;
		};
		
		ResourceSpace.prototype = new Workspace(capacity);	
		ResourceSpace.prototype.resolve = function(player) {
            var workerCount = this.workersFor(player);

            var cup = new Cup();
            cup.dieCount(workerCount);

            var dieResult = cup.rollAllDice();
            for(var i = 0; i < dieResult; i+=this._costPerResource){
                //the "lumber" part sucks, but getting tired...
                player.addResource(new Resource("lumber", this._costPerResource)); 
            }
		};
		
		return ResourceSpace;
	};
});