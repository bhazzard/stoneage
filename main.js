require([], function() {
	$('.player_board .worker').dragdrop({
		canDrop: function($el) {
			return $el.hasClass('worker_space') && $el.hasClass('empty');
		},
		didDrop: function($src, $dest) {
			$dest.removeClass('empty').addClass('filled');
			$src.appendTo($dest);
		}
	});
	
	function resolutionTurn(player) {
		var turnOptions, $playerBoard, $playerWorkers,
			$playerResources, $lumberWorkers;
		$playerBoard = $('.player_board.player_' + player);
		$playerWorkers = $playerBoard.find('.workers');
		$playerResources = $playerBoard.find('.resources');
		
		turnOptions = {};
		
		$lumberWorkers = $('#forest').find('.worker.player_' + player);
		$lumberSpaces = $lumberWorkers.parent();
		if ($lumberWorkers.length > 0) {
			turnOptions.forest = function() {
				var count = $lumberWorkers.length;
				$lumberSpaces.removeClass('filled').addClass('empty');
				$lumberWorkers.appendTo($playerWorkers);
				var roll = rollDice(count);
				var produced = Math.floor(roll/3);
				alert("You rolled " + roll + " so you will get " + produced + " lumber");
				for (i=0; i<produced; i++) {
					$playerResources.append('<li class="resource lumber"></li>');
				}
			};
		}
		
		return turnOptions;
	}
	
	function rollDice(quantity) {
		var dice = quantity,
			sides = 6,
			roll = 0;
			
		for (loop=0; loop < dice; loop++) {
			roll = roll + Math.round(Math.random() * sides) % sides + 1;
		}
		
		return roll;
	}
	
	$('#test').click(function() {
		var resolutionTurnOptions = resolutionTurn(1);
		$.each(resolutionTurnOptions, function(key, val) {
			$('<a class="resolve">Resolve</a>').click(function() {
				val();
				$(this).remove();
			}).appendTo('#' + key);
		});
	});
});