require([
   "src/player",
   "src/workspace",
   "src/placement"
], function(Player, Workspace, Placement) {
   module("Given a player and a workspace", {
      setup: function() {
         this.player = new Player(1);
         this.workspace = new Workspace(4);
      } 
   });

   asyncTest("When the player places a worker in the workspace", function() {
      var placement = new Placement(this.player, 1);

      expect(2);

      var self = this;
      this.workspace.bind('placed', function(placement) {
         equal(self.workspace.capacity(), 3, "The workspace should have one less capacity");
         equal(self.player.workers(), 4, "The player should have one less worker");

         start();
      });

      this.workspace.place(placement);
   });
});
