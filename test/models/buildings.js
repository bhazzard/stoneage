require([
    'underscore',
    'src/models/buildings'
  ], function(_, Buildings) {
  module('models.buildings');

  test('initialize', function() {
    var buildings = new Buildings([], {
      players: 3
    });

    var piles = _.uniq(buildings.pluck('pile'));

    deepEqual([1, 2, 3], piles, 'Should have a pile for each player');
  });

  test('empty', function() {
    var buildings = new Buildings([], {
      players: 2
    });

    ok(!buildings.empty(), 'should have no empty piles');

    var pile1 = buildings.filter(function(building) {
      return building.get('pile') === 1;
    });
    buildings.remove(pile1);

    ok(buildings.empty(), 'should have one empty pile');
  });

  test('onTop', function() {
    var buildings = new Buildings([], {
      players: 2
    });

    ok(buildings.onTop(buildings.at(0)), 'should be on top');
    ok(!buildings.onTop(buildings.at(1)), 'should not be on top');
  });
});
