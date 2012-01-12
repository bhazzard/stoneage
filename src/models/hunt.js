define([
	'src/models/workspace'
	], function(Workspace){
	return Workspace.extend({
		initialize: function() {
			this.set({
				name : 'hunt',
				resource: 'food',
				value: 2
			});
		},
		canPlace: function(player, count){
      return true;
		}
	});
});
