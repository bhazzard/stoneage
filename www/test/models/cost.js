require([
    'src/models/player',
    'src/models/payment',
    'src/models/cost'
  ], function(Player, Payment, Cost) {
  module('models.cost');

  test('canAfford.fixed', function() {
    var cost = new Cost({ wood: 2, brick: 3 }),
      player = new Player();

    player.set(cost.toJSON());

    ok(cost.canAfford(player), 'Can afford fixed resource cost');

    player.set('wood', 1);
    ok(!cost.canAfford(player), 'Cannot afford fixed resource cost');
  });

  test('canAfford.any', function() {
    var cost = new Cost({ any: 2 }),
      player = new Player();

    player.set('brick', 2);
    ok(cost.canAfford(player), 'Can afford any 2 resource cost');

    player.set('brick', 0);
    ok(!cost.canAfford(player), 'Cannot afford any 2 resource cost');
  });

  test('canAfford.atmost', function() {
    var cost = new Cost({ atmost: 7 }),
      player = new Player();

    player.set('stone', 1);
    ok(cost.canAfford(player), 'Can afford at most 7 resource cost');

    player.set('stone', 7);
    ok(cost.canAfford(player), 'Can afford at most 7 resource cost');

    player.set('stone', 0);
    ok(!cost.canAfford(player), 'Cannot afford at most 7 resources cost');
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

  test('met.any.kinds', function() {
    var cost = new Cost({ any: 4, kinds: 2 }), payment;

    payment = new Payment({ wood: 1, brick: 3 });
    ok(cost.met(payment), 'Should be met with any 4 resources of 2 kinds');

    payment = new Payment({ wood: 2, brick: 1 });
    ok(!cost.met(payment), 'Should not be met with less than 4 resources');

    payment = new Payment({ wood: 2, brick: 1, stone: 1 });
    ok(!cost.met(payment), 'Should not be met with 4 resources of 3 kinds');

    payment = new Payment({ wood: 4 });
    ok(!cost.met(payment), 'Should not be met with 4 resources of 1 kind');
  });

  test('met.atmost', function() {
    var cost = new Cost({ atmost: 7 }), payment;

    payment = new Payment({ wood: 1 });
    ok(cost.met(payment), 'Should be met with any 1 resource');

    payment = new Payment({ wood: 1, brick: 2, stone: 4 });
    ok(cost.met(payment), 'Should be met with any 7 resources');

    payment = new Payment();
    ok(!cost.met(payment), 'Should not be met with less than 1 resource');

    payment = new Payment({ gold: 8 });
    ok(!cost.met(payment), 'Should not be met with more than 7 resource');
  });
});
