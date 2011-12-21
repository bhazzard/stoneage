require([
	"src/player",
	"src/resourcespace",
	"src/placement",
	"src/dice"
], function(Player, ResourceSpace, Placement, Dice) {
	(function() {
		module("When I resolve a resource space");
		var player = new Player(1),
			space = new (ResourceSpace(10))(3),
			placement = new Placement(player, space, 1),
			dice = new Dice(),
			resources;
		
		placement.execute();
		space.tradeWorkersForDice(player, dice);

		test("Should get a die for every worker", function() {
			equal(dice.quantity(), 1);
		});
	})();
});