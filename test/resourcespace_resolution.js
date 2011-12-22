require([
	"src/player",
	"src/resourcespace",
	"src/placement",
    "src/cup"
], function(Player, ResourceSpace, Placement, Cup) {
	(function() {
		module("When I resolve a resource space");
		var player = new Player(1),
			space = new (ResourceSpace(10))(3),
			placement = new Placement(player, 1),
			cup = new Cup(),
			resources;
		
		space.place(placement);
        cup.dieCount(space.workersFor(player));

		test("Should get a die for every worker", function() {
			equal(cup.dieCount(), 1);
		});
	})();
});