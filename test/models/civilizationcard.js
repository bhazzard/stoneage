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
});
