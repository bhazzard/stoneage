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
            if(this.workers(player) > 0){
                //Already on this workspace
                return false;
            }
            return true;
        }
    });
});
