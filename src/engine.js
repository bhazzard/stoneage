define(['underscore', 'src/player', 'src/workspace', 'src/placement'], function(_, Player, Workspace, Placement) {
   function Engine(options) {
      this._options = options;
      this._players = [];
      this._spaces = {};
      this._currentPlayer = 0;

      var that = this;
      this._spaces['forest'] = new Workspace(10);
      this._spaces['forest'].bind('placed', function(placement) {
        that._options.workersChanged(placement.player._color, 'forest', placement.workers);
        that._options.workersChanged(placement.player._color, 'playerBoard', placement.player.workers());

        that._currentPlayer += 1;
        that._currentPlayer %= that._players.length;
        that._options.turnChange(that._players[that._currentPlayer]._color);
      });
   };

   Engine.prototype.placeWorkers = function(color, spaceName, numWorkers) {
      var player = this.getPlayer(color),
          workspace = this._spaces[spaceName],
          placement = new Placement(player, numWorkers);

      workspace.place(placement);
   };

   Engine.prototype.listPlayers = function() {
      return this._players;
   };

   Engine.prototype.getPlayer = function(color) {
      return _(this._players).find(function(player) {
        return player._color === color;
      });
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

      this._options.turnChange(this._players[0]._color);
   };

   return Engine;
});
