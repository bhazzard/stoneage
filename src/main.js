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
    'src/views/board',
    'src/models/player',
    'src/models/players',
    'src/views/player',
    'src/views/feed',
    'src/views/bottompanel'
  ], function($, Backbone, Board, BoardView, Player, Players, PlayerView, FeedView, BottomPanel) {
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
});
