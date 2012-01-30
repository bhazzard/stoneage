require([
    'src/models/civilizationcard',
    'src/models/player'
  ], function(CivilizationCard, Player) {
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
});
