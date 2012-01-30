require([
    'src/models/building',
    'src/models/cost'
  ], function(Building, Cost) {
  module('models.building');

  test('initialize', function() {
    var building = new Building({
      cost: new Cost({ wood: 3 })
    });

    equals(building.cost.get('wood'), 3, 'Should cost 3 wood');
    equals(building.get('cost'), undefined, 'Should remove cost attribute');
  });
});
