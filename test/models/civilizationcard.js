require([
    'backbone',
    'src/models/civilizationcard',
    'src/models/payment',
    'src/models/player'
  ], function(Backbone, CivilizationCard, Payment, Player) {
  module('models.civilizationcard');

  test('name', function() {
    var card = new CivilizationCard({ id: 2 });

    equals(card.get('name'), 'civcard civcard2');

    card.set('space', 1);
    equals(card.get('name'), 'civcard civcard2 space1');

    card.set('space', 3);
    equals(card.get('name'), 'civcard civcard2 space3');
  });

  test('space', function() {
    var card = new CivilizationCard({ space: 1 });

    equals(card.cost.get('any'), 1, 'Should cost 1 of any resource');

    card.set('space', 2);
    equals(card.cost.get('any'), 2, 'Should cost 2 of any resource');

    card.set('space', 4);
    equals(card.cost.get('any'), 4, 'Should cost 4 of any resource');
  });

  test('canPlace', function() {
    var card = new CivilizationCard(),
      player = new Player({ id: 1 });

    player.set('workers', 0);
    ok(!card.canPlace(player), 'Cannot place if 0 workers');

    player.set('workers', 2);
    card.place(player);
    ok(!card.canPlace(player), 'Cannot place if already occupied');

    player.set('production', 1);
    card.set(player.id, undefined);
    ok(card.canPlace(player), 'Can place if not occupied');
  });

  test('resolve.cannotAfford', function() {
    var card = new CivilizationCard({ space: 2 }),
      player = new Player({ id: 1 });

    expect(1);
    card.bind('resolve', function() {
      ok(true, 'Should resolve immediately');
    });
    card.place(player);
    card.resolve(player);
  });

  test('resolve.canAfford', function() {
    var card = new CivilizationCard({ space: 2 }),
      player = new Player({ id: 1, wood: 2 });

    expect(1);
    card.bind('purchase', function() {
      ok(true, 'Should prompt for purchase');
    });
    card.place(player);
    card.resolve(player);
  });

  test('purchase', function() {
    var card = new CivilizationCard({ space: 2 }),
      player = new Player({ id: 1, wood: 2, brick: 3 }),
      payment = new Payment({ wood: 1, brick: 1 }),
      collection = new Backbone.Collection();

    expect(3);
    card.bind('resolve', function() {
      equals(player.get('wood'), 1, 'Should pay with 1 wood');
      equals(player.get('brick'), 2, 'Should pay with 2 brick');
      equals(collection.length, 0, 'Should remove card from collection');
    });
    collection.add(card);
    card.purchase(player, payment);
  });
});
