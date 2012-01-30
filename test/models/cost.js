require([
    'src/models/player',
    'src/models/payment',
    'src/models/cost'
  ], function(Player, Payment, Cost) {
  module('models.cost');

  test('canAfford', function() {
    var cost = new Cost(),
      player = new Player();

    cost.set({ wood: 2, brick: 3 });
    player.set(cost.toJSON());

    ok(cost.canAfford(player), 'Can afford fixed resource cost');

    player.set('wood', 1);
    ok(!cost.canAfford(player), 'Cannot afford fixed resource cost');

    cost.clear();
    cost.set({ any: 2 });
    ok(cost.canAfford(player), 'Can afford any 2 resource cost');

    player.set('brick', 0);
    ok(!cost.canAfford(player), 'Cannot afford any 2 resource cost');
  });

  test('isFixed', function() {
    var cost = new Cost();

    cost.set({ wood: 2, brick: 3 });

    ok(cost.isFixed(), 'Is fixed resource cost');

    cost.clear();
    cost.set({ any: 2 });
    ok(!cost.isFixed(), 'Is not fixed resource cost');
  });

  test('met.any', function() {
    var cost = new Cost({ any: 2 }), payment;

    payment = new Payment({ wood: 1, brick: 1 });
    ok(cost.met(payment), 'Should be met with any 2 resources');

    payment = new Payment({ brick: 2 });
    ok(cost.met(payment), 'Should be met with 2 of the same resource');

    payment = new Payment({ brick: 1 });
    ok(!cost.met(payment), 'Should not be met with less than 2 resources');
  });
});
