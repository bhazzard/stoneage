require(['src/models/civilizationcard'], function(CivilizationCard) {
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
    var card = new CivilizationCard();

    card.set('space', 1);
    equals(card.cost.get('any'), 1, 'Should cost 1 of any resource');

    card.set('space', 3);
    equals(card.cost.get('any'), 3, 'Should cost 3 of any resource');
  });
});
