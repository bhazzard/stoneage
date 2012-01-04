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

  /**
   * Worker placement phase
   */
  function placeWorkers(resourceSpace, playerName) {
    var workers = prompt('Player ' + playerName + ', how many workers?'),
      remaining = 0;

    $('.player-board.player' + playerName + ' .worker-pile').html(function(i, html) {
      //Cap the number of workers we can actually place
      workers = Number(workers) + Math.min(0, Number(html) - Number(workers));
      return Number(html) - Number(workers);
    });

    $('.worker-pile.player' + playerName, resourceSpace).html(function(i, html) {
      return Number(html) + Number(workers);
    });

    //Figure out if any player has workers left to place
    $('.player-board .worker-pile').each(function() {
      remaining += Number($(this).html());
    });

    //If all workers have been placed, return the resolution phase
    //(this depends on function hoisting, yay javascript!)
    return remaining === 0 ? resolve : placeWorkers;
  };

  /**
   * Resolution phase
   */
  function resolve(resourceSpace, playerName) {
  };

  $(function() {
    var players = [1,2],
      resources = ['forest', 'claypit', 'quary', 'river'],
      player = 0,
      phase = placeWorkers;

    createBoard(players, resources);
    initializeBoard();

    $('.resource-space').click(function() {
      var nextPhase = phase(this, players[player]);

      //Cycle to the next player
      player = (player + 1) % players.length;

      //If the phase changed, go back to the first player
      if (nextPhase !== phase) {
        player = 0;
      }

      //Advance to the next phase (if it changed at all)
      phase = nextPhase;
    });
  });
});
