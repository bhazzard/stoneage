require(['src/engine'], function(Engine) {
   $(function() {
      var stage, board, forest, piles;
      
      stage = $('<div/>')
         .attr('id', 'stage');

      board = $('<div/>')
         .attr('id', 'board')
         .appendTo(stage);

      forest = $('<div/>')
         .addClass('forest')
         .addClass('resourceSpace')
         .appendTo(board);

      $('<div/>').addClass('worker-pile').addClass('player-red').appendTo(forest);

      stage.appendTo('body');

      var playerBoard = $('<div />').addClass('playerBoard').appendTo(stage);
      $('<div/>').addClass('worker-pile').addClass('player-red').appendTo(playerBoard);
      $('<div/>').addClass('worker-pile').addClass('player-green').appendTo(playerBoard);

      var engine = new Engine({
        workersChanged: function(player, space, quantity) {
            $('.' + space).find('.worker-pile.player-' + player).html(quantity);
         },
         removeWorkers: function(player, space) {
            $('.' + space + ' .player-' + player).remove();
         },
          pickPlayers: function() {
            return [
              { color: 'red' },
              { color: 'green' }
            ];
          }
      });
      engine.start();
   });
});
