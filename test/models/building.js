require([
    'src/models/player',
    'src/models/building',
    'src/models/cost'
  ], function(Player, Building, Cost) {
  module('models.building');

  test('initialize', function() {
    var building = new Building({
      cost: new Cost({ wood: 3 })
    });

    equals(building.cost.get('wood'), 3, 'Should cost 3 wood');
    equals(building.get('cost'), undefined, 'Should remove cost attribute');
  });

  test('canPlace', function() {
    var building = new Building(),
      player = new Player({ id: 1 });

    player.set('workers', 0);
    ok(!building.canPlace(player), 'Cannot place if 0 workers');

    player.set('workers', 2);
    building.place(player);
    ok(!building.canPlace(player), 'Cannot place if already occupied');

    player.set('production', 1);
    building.set(player.id, undefined);
    ok(building.canPlace(player), 'Can place if not occupied');
  });

  test('resolve.cannotAfford', function() {
    var building = new Building({
        cost: new Cost({ wood: 3 })
      }),
      player = new Player({ id: 1 });

    expect(1);
    building.bind('resolve', function() {
      ok(true, 'Should resolve immediately');
    });
    building.place(player);
    building.resolve(player);
  });
});
