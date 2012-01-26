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

  test('feed', function() {
    var player = new Player();

    player.feed();

    equals(player.get('food'), 7, 'Should have 7 food after feeding 5 workers');
  });

  test('feed.deficit.score.auto', function() {
    var player = new Player({ food: 2 });

    player.feed();
    equals(player.get('food'), 0, 'Should have 0 food');
    equals(player.get('score'), -10, 'Automatically lose 10 points');
  });

  test('feed.deficit', function() {
    var player = new Player({
      food: 2,
      wood: 3
    });

    expect(1);
    player.bind('deficit', function() {
      equals(player.get('deficit'), 3, 'Should trigger deficit with 3 unfed workers');
    });
    player.feed();
  });

  test('feed.deficit.score', function() {
    var player = new Player({
      deficit: 3,
      food: 2,
      wood: 3
    });

    expect(3);
    player.bind('fed', function() {
      equals(player.get('food'), 0, 'Should have 0 food');
      equals(player.get('deficit'), 0, 'Should have 0 deficit');
      equals(player.get('score'), -10, 'Should lose 10 points');
    });
    player.feed('score');
  });

  test('feed.deficit.resources', function() {
    var player = new Player({
      deficit: 3,
      food: 2,
      wood: 3,
      brick: 4
    });

    expect(5);
    player.bind('fed', function() {
      equals(player.get('food'), 0, 'Should have 0 food');
      equals(player.get('wood'), 1, 'Should have 1 wood');
      equals(player.get('brick'), 3, 'Should have 3 brick');
      equals(player.get('deficit'), 0, 'Should have 0 deficit');
      equals(player.get('score'), 0, 'Should not lose points');
    });
    player.feed({ wood: 2, brick: 1 });
  });
});
