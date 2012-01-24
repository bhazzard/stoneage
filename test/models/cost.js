require([
    'src/models/player',
    'src/models/cost'
  ], function(Player, Cost) {
  module('models.cost');

  test('canAfford', function() {
    var cost = new Cost(),
      player = new Player();

    cost.set({ wood: 2, brick: 3 });
    player.set(cost.toJSON());

    ok(cost.canAfford(player), 'Can afford fixed resource cost');

    player.subtract('wood', 1);
    ok(!cost.canAfford(player), 'Cannot afford fixed resource cost');
  });

  test('isFixed', function() {
    var cost = new Cost();

    cost.set({ wood: 2, brick: 3 });

    ok(cost.isFixed(), 'Is fixed resource cost');

    cost.clear();
    cost.set({ any: 2 });
    ok(!cost.isFixed(), 'Is not fixed resource cost');
  });
});
