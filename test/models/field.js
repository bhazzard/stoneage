require([
    'src/models/player',
    'src/models/field'
  ], function(Player, Field) {
  module('models.field');

  test('resolve', function() {
    var field = new Field(),
      player = new Player({ id: 1 });

    field.place(player);
    field.resolve(player);

    equals(player.get('production'), 1, 'production should increase by 1');
    equals(player.get('workers'), 5, '1 worker should be returned to player');

    field.resolve(player);
    equals(player.get('production'), 1, 'production should not increase by 1 a second time');
  });
});
