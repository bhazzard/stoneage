define(['underscore', 'backbone'], function(_, Backbone){
  return Backbone.Model.extend({
    initialize : function(workspaces, playercount){
      this.set({
        huts : workspaces,
        playercount : playercount
      });
    }, 
    isSatisfied : function(workspace){
      var usedhuts = _(this.get('huts')).filter(function(hut){
        return hut.workers() > 0;
      }).length;
      return !(this.get('playercount') === 2 &&
        this._isHut(workspace) &&
        usedhuts === 2);
    },
    _isHut : function(workspace){
      var workspaces = this.get('huts');
      return _(workspaces).any(function(w){
        return w.get('name') === workspace.get('name');
      });
    }
  });
});
