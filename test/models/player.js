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
});
