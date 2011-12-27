define(['lib/underscore'], function(_) {
   function Engine(options) {
      this._options = options;
      this._players = [];
      this._spaces = {};
   };

   Engine.prototype.placeWorkers = function(color, spaceName, numWorkers) {
      var player = this.getPlayer(color),
          workspace = this.getSpaces[spaceName],
          placement = new Placement(player, numWorkers);

      workspace.place(placement);
   };

   Engine.prototype.listPlayers = function() {
      return this._players;
   };

   Engine.prototype.getPlayer = function(color) {
      return this._players[color];
   };

   Engine.prototype.listSpaces = function() {
      return this._spaces;
   };

   Engine.prototype.getSpace = function(name) {
      return this._spaces[name];
   };

   Engine.prototype.start = function() {
      if (!this._options.pickPlayers) {
         throw "pickPlayers is a required callback"
      }
      var p = this._options.pickPlayers();
      for(var i=0;i<p.length;i++){
        this._players.push(p[i].color);
      }
   };

   return Engine;
});