require([
	"src/player",
	"src/workspace",
	"src/placement"
], function(Player, Workspace, Placement) {
	(function() {
		module("When I place one worker in a workspace");
		var player = new Player(1),
			workspace = new Workspace(4),
			placement = new Placement(player, workspace, 1);
		
		placement.execute();

		test("The workspace has one less capacity", function() {
			equal(workspace.capacity(), 3);
		});
	})();
});