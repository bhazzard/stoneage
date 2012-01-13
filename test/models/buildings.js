require(['src/models/buildings'], function(Buildings) {
  module('models.buildings');

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
