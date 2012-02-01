define(['underscore', 'backbone'], function(_, Backbone){
  return Backbone.Model.extend({
    initialize : function(huts, players){
      this.set({
        huts : huts
      });
      this.players = players;
    }, 
    isSatisfied : function(workspace){
      return this._playerCount() !== 2 ||
        !this._isHut(workspace) ||
        this._usedHutCount() !== 2;
    },
    _isHut : function(workspace){
      return _(this.get('huts')).any(function(hut){
        return hut.equals(workspace);
      });
    },
    _playerCount : function(){
      return this.players.length;
    },
    _usedHutCount : function(){
      return _(this.get('huts')).filter(function(hut){
        return hut.workers() > 0;
      }).length;
    }
  });
});
