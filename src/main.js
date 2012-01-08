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
    'underscore',
    'backbone',
    'src/models/board',
    'src/views/board',
    'src/models/player',
    'src/models/players',
    'src/views/player'
  ], function($, _, Backbone, Board, BoardView, Player, Players, PlayerView) {
  var players = new Players(),
    board = new Board({
      players: players
    }),
    boardView = new BoardView({
      model: board
    });

  $(boardView.render().el).appendTo('body');

  players.add(new Player());
  players.add(new Player());

  players.each(function(player) {
    var view = new PlayerView({
      model: player
    });
    $(view.render().el).appendTo('body');
  });
});
