define(['src/workspace', 'src/cup'], function(Workspace, Cup) {
  return function(capacity) {
    function ResourceSpace(resource) {
      this.resource = resource;
    };

    ResourceSpace.prototype = new Workspace(capacity);	

    ResourceSpace.prototype.tradeWorkersForDice = function(player, cup) {
      var workerCount = this.workersFor(player);
      cup.dieCount(workerCount);
    };

    ResourceSpace.prototype.tradeDiceForResources = function(player, cup) {
      var totalValue = 0;
      var resource = this.resource();
      while(totalValue + resource.value() <= cup.result()) {
        totalValue += resource.value();
        player.addResource(resource); 
        resource = this.resource();
      }
    };

    return ResourceSpace;
  };
});
