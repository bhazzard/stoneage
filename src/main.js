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

    //Create player boards for each player
    players.each(function(player) {
      var board = $('<div />')
        .addClass('player-board')
        .addClass('player' + player.id)
        .appendTo('body');
      $('<div/>').addClass('worker-pile').appendTo(board);
    });

    //Create all of the resource spaces
    _(resources).each(function(resource) {
      $('<div/>')
        .addClass(resource)
        .addClass('resource-space')
        .appendTo('#board');

      //Create piles for all players in each resource space
      //As well as for all resources on each player board
      players.each(function(player) {
        $('<div/>').addClass('worker-pile').addClass('player' + player.id).appendTo('.resource-space.' + resource);
        $('<div/>').addClass('resource-pile').addClass(resource).appendTo('.player-board.player' + player.id);
      });
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
  function placeWorkers(resourceSpace, players) {
    var player = players.current(),
      playerName = player.id,
      workers = prompt('Player ' + playerName + ', how many workers?');

    player.place({
      //This is awkward at the moment, but will be less so once
      //workspaces are represented by actual classes.
      place: function(count) {
        $('.player-board.player' + playerName + ' .worker-pile').html(function(i, html) {
          return Number(html) - count;
        });

        $('.worker-pile.player' + playerName, resourceSpace).html(function(i, html) {
          return Number(html) + count;
        });
      }
    }, workers);

    //If all workers have been placed, return the resolution phase
    //(this depends on function hoisting, yay javascript!)
    if (players.remainingWorkers() === 0) {
      players.reset();
      return resolve;
    } else {
      players.nextTurn();
      return placeWorkers;
    }
  };

  /**
   * Resolution phase
   */
  function resolve(resourceSpace, players) {
    var playerName = players.current().id;

    $(resourceSpace).trigger('resolve', players);

    //Figure out how many spots remain to be resolved
    var remainingPlayer = _($('.resource-space .worker-pile.player' + playerName)).reduce(function(memo, elem) {
      return memo + Number($(elem).html());
    }, 0);

    var remainingTotal = _($('.resource-space .worker-pile')).reduce(function(memo, elem) {
      return memo + Number($(elem).html());
    }, 0);

    if (remainingTotal === 0) {
      console.log('resolution phase complete!');
      players.reset();
    } else if (remainingPlayer === 0) {
      players.nextTurn();
    } else {
    }
    return resolve;
  };

  function roll(numDice) {
    var total = 0;
    for (var i=0; i<numDice; i++) {
      total += Math.round(Math.random() * 6) + 1;
    }

    return total;
  };

  function resolveResourceSpace(resourceName, value) {
    return function(event, players) {
      var playerName = players.current().id,
        workers = $(this).find('.worker-pile.player' + playerName).html(),
        diceRoll = roll(Number(workers)),
        resourceCount = Math.floor(diceRoll / value);
      alert('Player' + playerName + ' rolled ' + diceRoll + ' and got ' + resourceCount + ' ' + resourceName);

      $('.worker-pile.player' + playerName, this).html('');

      $('.player-board.player' + playerName + ' .worker-pile').html(function(i, html) {
        return Number(html) + Number(workers);
      });

      $('.player-board.player' + playerName + ' .resource-pile.' + resourceName).html(resourceCount);
    };
  };

  /**
   * Players collection
   */
  function Players() {
    this.reset();
  };

  Players.prototype.addPlayer = function(player) {
    this.players = this.players || [];
    this.players.push(player);
    player.id = this.players.length;
  };

  Players.prototype.nextTurn = function() {
    this.active = (this.active + 1) % this.players.length;
  };

  Players.prototype.reset = function() {
    this.active = 0;
  };

  Players.prototype.current = function() {
    return this.players[this.active];
  };

  Players.prototype.remainingWorkers = function() {
    return _(this.players).reduce(function(memo, player) {
      return memo + player.workers;
    }, 0);
  };

  Players.prototype.each = function(iterator, context) {
    _(this.players).each(iterator, context);
  };

  /**
   * Player
   */
  function Player() {
    this.workers = 5;
  };

  Player.prototype.place = function(workspace, count) {
    count = count || 1;
    count = Math.min(count, this.workers);
    this.workers -= count;
    workspace.place(count);
  };

  $(function() {
    var players = new Players(),
      resources = ['forest', 'claypit', 'quary', 'river'],
      phase = placeWorkers;

    players.addPlayer(new Player());
    players.addPlayer(new Player());

    createBoard(players, resources);
    initializeBoard();

    $('.resource-space').click(function() {
      phase = phase(this, players);
    });

    $('.forest').on('resolve', resolveResourceSpace('forest', 3));
    $('.claypit').on('resolve', resolveResourceSpace('claypit', 4));
    $('.quary').on('resolve', resolveResourceSpace('quary', 5));
    $('.river').on('resolve', resolveResourceSpace('river', 4));
  });
});
