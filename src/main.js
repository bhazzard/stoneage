require.config({
   paths: {
     'underscore': 'lib/underscore-1.2.3',
     'jquery': 'lib/jquery-1.7.1'
   },
   baseUrl: ".",
   waitSeconds: 15,
   urlArgs: "bust=" +  (new Date()).getTime()
});

require(['jquery', 'underscore'], function($, _) {
  /**
   * Creates the visual representation of the board
   */
  function createBoard(players, resources) {
    //Create the main board element
    $('<div/>')
      .attr('id', 'board')
      .appendTo('body');

    //Create all of the resource spaces
    _(resources).each(function(resource) {
      $('<div/>')
        .addClass(resource)
        .addClass('resource-space')
        .appendTo('#board');

      //Create piles for all players in each resource space
      _(players).each(function(player) {
        $('<div/>').addClass('worker-pile').addClass('player' + player).appendTo('.' + resource);
      });
    });

    //Create player boards for each player
    _(players).each(function(player) {
      var board = $('<div />')
        .addClass('player-board')
        .addClass('player' + player)
        .appendTo('body');
      $('<div/>').addClass('worker-pile').appendTo(board);
    });
  };

  /**
   * Initialize the board state
   */
  function initializeBoard() {
    $('.worker-pile').empty();
    $('.player-board .worker-pile').html(5);
  };

  $(function() {
    var players = [1,2],
      resources = ['forest', 'claypit', 'quary', 'river'],
      player = 0;

    createBoard(players, resources);
    initializeBoard();

    //Worker placement phase
    $('.resource-space').click(function() {
      var playerName = players[player],
        workers = prompt('Player ' + playerName + ', how many workers?');

      $('.worker-pile.player' + playerName, this).html(function(i, html) {
        return html + Number(workers);
      });

      $('.player-board.player' + playerName + ' .worker-pile').html(function(i, html) {
        return html - Number(workers);
      });

      //Cycle to the next player
      player = (player + 1) % players.length;
    });
  });
});
