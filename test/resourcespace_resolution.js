require([
   "src/player",
   "src/resourcespace",
   "src/placement",
   "src/cup",
   "src/resource"
], function(Player, ResourceSpace, Placement, Cup, Resource) {
   (function() {
      module("When I resolve a resource space");
      var player = new Player(1),
         space = new (ResourceSpace(10))(function() {
            return new Resource("test", 3);   
         }),
         placement = new Placement(player, 1),
         cup = new Cup(),
         resources;

      space.place(placement);
      space.tradeWorkersForDice(player, cup);
      cup.result(6);
      space.tradeDiceForResources(player, cup);

      test("Should get a die for every worker", function() {
         equal(cup.dieCount(), 1);
      });

      test("Should get a resource for roll / cost rounded down", function() {
         equal(player.resourceCount(), 2);
      });
   })();
});
