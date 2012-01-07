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

require(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
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
        .addClass('workspace')
        .appendTo('#board');

      //Create piles for all players in each resource space
      //As well as for all resources on each player board
      players.each(function(player) {
        $('<div/>').addClass('worker-pile').addClass('player' + player.id).appendTo('.workspace.' + resource);
        $('<div/>').addClass('worker-pile').addClass('player' + player.id).appendTo('#' + resource);
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
      players.gotoLeader();
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

    $(resourceSpace).trigger('resolve', [players]);

    //Figure out how many spots remain to be resolved
    var remainingPlayer = _($('.workspace .worker-pile.player' + playerName)).reduce(function(memo, elem) {
      return memo + Number($(elem).html());
    }, 0);

    var remainingTotal = _($('.workspace .worker-pile')).reduce(function(memo, elem) {
      return memo + Number($(elem).html());
    }, 0);

    if (remainingTotal === 0) {
      players.gotoLeader();
      return placeWorkers;
    } else if (remainingPlayer === 0) {
      players.nextTurn();
      return resolve;
    } else {
      return resolve;
    }
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
      var player = players.current(),
        playerName = player.id,
        workers = Number($(this).find('.worker-pile.player' + playerName).html()),
        diceRoll = roll(workers),
        resourceCount = Math.floor(diceRoll / value);
      alert('Player' + playerName + ' rolled ' + diceRoll + ' and got ' + resourceCount + ' ' + resourceName);

      player.addWorkers(workers);

      $('.worker-pile.player' + playerName, this).html('');

      $('.player-board.player' + playerName + ' .worker-pile').html(function(i, html) {
        return Number(html) + workers;
      });

      $('.player-board.player' + playerName + ' .resource-pile.' + resourceName).html(resourceCount);
    };
  };

  /**
   * Player
   */
  var Player = Backbone.Model.extend({
    defaults: {
      workers: 5
    },
    place: function(workspace, count) {
      var workers = this.get('workers');
      count = count || 1;
      count = Math.min(count, workers);
      this.set('workers', workers - count);
      workspace.place(count);
    },
    addWorkers: function(count) {
      this.set('workers', this.get('workers') + count);
    }
  });

  /**
   * Players collection
   */
  var Players = Backbone.Collection.extend({
    model: Player,
    initialize: function() {
      this.gotoLeader();
      this.bind('add', this._setPlayerId, this);
    },
    gotoLeader: function() {
      this.active = 0;
    },
    nextTurn: function() {
      this.active = (this.active + 1) % this.length;
    },
    current: function() {
      return this.at(this.active);
    },
    remainingWorkers: function() {
      return this.reduce(function(memo, player) {
        return memo + player.get('workers');
      }, 0);
    },
    _setPlayerId: function(player) {
      player.id = this.length;
    }
  });

  $(function() {
    var players = new Players(),
      resources = ['forest', 'claypit', 'quary', 'river'],
      phase = placeWorkers;

    players.add(new Player());
    players.add(new Player());

    createBoard(players, resources);
    initializeBoard();

    $('.workspace').click(function() {
      phase = phase(this, players);
    });

    $('.forest').on('resolve', resolveResourceSpace('forest', 3));
    $('.claypit').on('resolve', resolveResourceSpace('claypit', 4));
    $('.quary').on('resolve', resolveResourceSpace('quary', 5));
    $('.river').on('resolve', resolveResourceSpace('river', 6));
  });
});
