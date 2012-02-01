require([
    'src/models/player',
    'src/models/specialhut'
  ], function(Player, SpecialHut) {
  module('models.specialhut');

  test('resolve', function() {
    var specialhut = new SpecialHut(),
      player = new Player({ id: 1 });

    expect(1);
    specialhut.bind('resolve', function() {
      equals(player.get('workers'), 6, 'Should increase workers by 1');
    });
    specialhut.place(player);
    specialhut.resolve(player);
  });

  test('resolve.once', function() {
    var specialhut = new SpecialHut(),
      player = new Player({ id: 1 });

    expect(1);
    specialhut.bind('resolve', function() {
      equals(player.get('workers'), 6, 'Should increase workers by 1 once');
    });
    specialhut.place(player);
    specialhut.resolve(player);
    specialhut.resolve(player);
  });

  test('canPlace', function() {
    var specialhut = new SpecialHut(),
      player = new Player({ id: 1 });

    player.set('workers', 0);
    ok(!specialhut.canPlace(player), 'Cannot place if 0 workers');

    player.set('workers', 1);
    ok(!specialhut.canPlace(player), 'Cannot place if 1 worker');

    player.set('workers', 2);
    specialhut.place(player);
    ok(!specialhut.canPlace(player), 'Cannot place if already occupied');

    player.set('workers', 5);
    specialhut.set(player.id, undefined);
    ok(specialhut.canPlace(player), 'Can place if not occupied');
    ok(player.get('workers'), 3, 'Should place 2 workers');
  });
});
