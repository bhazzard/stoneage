require(['src/models/player'], function(Player) {
  module('models.player');

  test('defaults', function() {
    var player = new Player();
    equals(player.get('workers'), 5, 'workers should be 5');
    equals(player.get('food'), 12, 'food should be 12');
    equals(player.get('score'), 0, 'score should be 0');
    equals(player.get('wood'), 0, 'wood should be 0');
    equals(player.get('brick'), 0, 'brick should be 0');
    equals(player.get('stone'), 0, 'stone should be 0');
    equals(player.get('gold'), 0, 'gold should be 0');
    equals(player.get('production'), 0, 'production should be 0');
  });

  test('add', function() {
    var player = new Player();
    player.add('score', 5);
    equals(player.get('score'), 5, 'score should be 5');
  });

  test('subtract', function() {
    var player = new Player({
      wood: 8
    });
    player.subtract('wood', 5);
    equals(player.get('wood'), 3, 'wood should be 3');
  });

  test('resourceCount', function() {
    var player = new Player({
      wood: 1,
      brick: 2,
      stone: 3,
      gold: 4
    });
    equals(player.resourceCount(), 10, 'resourceCount should be 10');
  });
});
