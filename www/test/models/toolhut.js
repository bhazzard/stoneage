require([
    'src/models/player',
    'src/models/toolhut'
  ], function(Player, Toolhut) {
  module('models.toolhut');

  Player.prototype.toolValue = function() {
    return this.tools.reduce(function(memo, tool) {
      return memo + tool.get('value');
    }, 0);
  };

  test('resolve', function() {
    var toolhut = new Toolhut(),
      player = new Player({ id: 1 });

    expect(2);
    toolhut.bind('resolve', function() {
      equals(player.toolValue(), 1, 'tools should increase by 1');
      equals(player.get('workers'), 5, '1 worker should be returned to player');
    });
    toolhut.place(player);
    toolhut.resolve(player);
  });

  test('resolve.once', function() {
    var toolhut = new Toolhut(),
      player = new Player({ id: 1 });

    expect(1);
    toolhut.bind('resolve', function() {
      equals(player.toolValue(), 1, 'tools should increase by 1 only once');
    });
    toolhut.place(player);
    toolhut.resolve(player);
    toolhut.resolve(player);
  });

  test('canPlace', function() {
    var toolhut = new Toolhut(),
      player = new Player({ id: 1 });

    player.set('workers', 0);
    ok(!toolhut.canPlace(player), 'Cannot place if 0 workers');

    player.set('workers', 2);
    toolhut.place(player);
    ok(!toolhut.canPlace(player), 'Cannot place if already occupied');

    player.set('production', 1);
    toolhut.set(player.id, undefined);
    ok(toolhut.canPlace(player), 'Can place if not occupied');
  });
});
