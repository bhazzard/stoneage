require.config({
   paths: {
     'backbone': 'lib/backbone-0.5.3.optamd3',
     'underscore': 'lib/underscore-1.2.3',
     'jquery': 'lib/jquery-1.7.1'
   },
   baseUrl: ".",
   waitSeconds: 15,
   urlArgs: "bust=" +  (new Date()).getTime()
});

require([
    'jquery',
    'backbone',
    'src/models/board',
    'src/models/player',
    'src/models/players',
    'src/models/dice',
    'src/views/board',
    'src/views/player',
    'src/views/feed',
    'src/views/placement',
    'src/views/bottompanel'
  ], function(
    $,
    Backbone,
    Board,
    Player,
    Players,
    Dice,
    BoardView,
    PlayerView,
    FeedView,
    PlacementView,
    BottomPanel) {
  var players = new Players([
      new Player(),
      new Player()
    ]),
    board = new Board({
      players: players
    }),
    boardView = new BoardView({
      model: board
    }),
    bottomPanel = new BottomPanel();

  $(boardView.render().el).appendTo('body');
  $(bottomPanel.render().el).appendTo('body');

  players.each(function(player) {
    var playerView = new PlayerView({
      model: player
    });
    var feedView = new FeedView({
      model: player
    });
    bottomPanel.addPlayer(playerView);
  });

  board.workspaces.bind('howmany', function(workspace) {
    var player = players.current(),
      placementView = new PlacementView({
        model: workspace,
        player: player
      });
    $(placementView.render().el).appendTo('body');
  });

  board.workspaces.bind('roll', function(workspace, player) {
    var dice = new Dice(workspace.workers(player));
    var roll = dice.roll();
    alert('rolled ' + roll);
    workspace.resolve(player, roll);
  });
});
