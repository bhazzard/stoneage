require(['src/facade'], function(Facade) {
   $(function() {
      var stage, board, forest;
      
      stage = $('<div/>')
         .attr('id', 'stage');

      board = $('<div/>')
         .attr('id', 'board')
         .appendTo(stage);

      forest = $('<div/>')
         .attr('id', 'forest')
         .addClass('resourceSpace')
         .appendTo(board);

      stage.appendTo('body');

      var facade = new Facade({
         placeWorkers: function(player, space, quantity) {
            $('<div/>')
               .addClass('worker')
               .addClass('player-' + player)
               .addClass('quantity-' + quantity)
               .html(quantity)
               .appendTo('#' + space);
         },
         removeWorkers: function(player, space) {
            $('#' + space + ' .player-' + player).remove();
         }
      });
   });
});
