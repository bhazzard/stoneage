define(['underscore', 'src/player'], function(_, Player) {
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

      this._players = _(this._options.pickPlayers()).map(function(player) {
        return new Player(player.color);
      });

      if (!this._options.workersChanged) {
         throw "workersChanged is a required callback"
      }
      
      _(this._players).each(function(player) {
        this._options.workersChanged(player._color, 'playerBoard', 5);
      }, this);

      this._options.workersChanged(this._players[0]._color, 'forest', 2);
      this._options.workersChanged(this._players[0]._color, 'playerBoard', 3);
   };

   return Engine;
});
