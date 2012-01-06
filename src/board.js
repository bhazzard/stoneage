define(['pubsub'], function($) {
  function PlacementHandler() {
	this.errors = [];
  }
  
  PlacementHandler.prototype.start = function() {
	$.subscribe('placeWorkers', function(event, placement) {
	  try {
	    player.takeWorkers(quantity);
	    space.addWorkers(quantity);
	
	    $.publish('workersPlaced', {
	      player: player,
	      space: space,
	      quantity: quantity
	    });
	  } catch(e) {
	    $.publish('errorWorkersPlaced', {
	      error: e,
		  player: player,
		  space: space,
		  quantity: quantity
	    });
	  }
	});
  }
 
  return PlacementHandler;
});
