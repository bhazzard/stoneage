require([
    'src/models/player',
    'src/models/payment'
  ], function(Player, Payment) {
  module('models.payment');

  test('execute', function() {
    var payment = new Payment({ wood: 1, brick: 2 }),
      player = new Player({ wood: 4, brick: 3, stone: 2 });

    payment.execute(player);

    equal(player.get('wood'), 3, 'Should remove 1 wood');
    equal(player.get('brick'), 1, 'Should remove 2 brick');
    equal(player.get('stone'), 2, 'Should remove 0 stone');
  });

  test('total', function() {
    var payment = new Payment({
      wood: 1,
      brick: 2,
      stone: 3,
      gold: 4
    });
    equal(payment.total(), 10, 'Resource total should be 10');
  });

  test('value', function() {
    var payment = new Payment({
      wood: 1,
      brick: 1,
      stone: 1,
      gold: 1
    });
    equal(payment.value(), 18, 'Resource value should be 18');
  });

  test('kinds', function() {
    var payment = new Payment({
      wood: 1
    });

    equal(payment.kinds(), 1, 'Should have 1 unique resource type');

    payment.set({ stone: 2, gold: 3 });
    equal(payment.kinds(), 3, 'Should have 3 unique resource types');
  });
});
