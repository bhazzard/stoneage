require([
    'src/models/player',
    'src/models/field'
  ], function(Player, Field) {
  module('models.field');

  test('resolve', function() {
    var field = new Field(),
      player = new Player({ id: 1 });

    expect(2);
    field.bind('resolve', function() {
      equals(player.get('production'), 1, 'production should increase by 1');
      equals(player.get('workers'), 5, '1 worker should be returned to player');
    });
    field.place(player);
    field.resolve(player);
  });

  test('resolve.once', function() {
    var field = new Field(),
      player = new Player({ id: 1 });

    expect(1);
    field.bind('resolve', function() {
      equals(player.get('production'), 1, 'production should increase by 1 only once');
    });
    field.place(player);
    field.resolve(player);
    field.resolve(player);
  });

  test('canPlace', function() {
    var field = new Field(),
      player = new Player({ id: 1 });

    player.set('workers', 0);
    ok(!field.canPlace(player), 'Cannot place if 0 workers');

    player.set('workers', 2);
    field.place(player);
    ok(!field.canPlace(player), 'Cannot place if already occupied');

    player.set('production', 10);
    field.set(player.id, undefined);
    ok(!field.canPlace(player), 'Cannot place if production is maximized');

    player.set('production', 1);
    field.set(player.id, undefined);
    ok(field.canPlace(player), 'Can place if not occupied');
  });
});
