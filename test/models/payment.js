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
});