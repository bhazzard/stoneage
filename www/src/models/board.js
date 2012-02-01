define([
    'backbone',
    'src/models/workspace',
    'src/models/workspaces',
    'src/models/field',
    'src/models/specialhut',
    'src/models/toolhut',
    'src/models/hunt',
    'src/models/buildings',
    'src/models/civilizationcards',
    'src/models/hutrule'
  ], function(
    Backbone,
    Workspace,
    Workspaces,
    Field,
    SpecialHut,
    ToolHut,
    Hunt,
    Buildings,
    CivilizationCards,
    HutRule) {
  return Backbone.Model.extend({
    defaults: {
      phase: 'place'
    },
    initialize: function() {
      this.players = this.get('players');
      this.unset('players');
      var buildings = new Buildings([], {
        players: this.players.length
      });
      var civilizationCards = new CivilizationCards();
      var workspaceMax = this.maxPlayers();
      var workspaces = new Workspaces();
      workspaces.add([
        new Hunt(),
        new Workspace({
          name: 'forest',
          resource: 'wood',
          value: 3,
          maxWorkers : 7,
          maxPlayers : workspaceMax
        }),
        new Workspace({
          name: 'claypit',
          resource: 'brick',
          value: 4,
          maxWorkers : 7,
          maxPlayers : workspaceMax
        }),
        new Workspace({
          name: 'quary',
          resource: 'stone',
          value: 5,
          maxWorkers : 7,
          maxPlayers : workspaceMax
        }),
        new Workspace({
          name: 'river',
          resource: 'gold',
          value: 6,
          maxWorkers : 7,
          maxPlayers : workspaceMax
        })
      ]);

      var field = new Field();
      var specialhut = new SpecialHut();
      var toolhut = new ToolHut();

      this.hutrule = new HutRule([field, specialhut, toolhut], this.players);
      workspaces.add([field, specialhut, toolhut]); 
      workspaces.add(buildings.models);
      civilizationCards.deal(workspaces);
      this.civilizationCards = civilizationCards;
      this.workspaces = workspaces;
      this.buildings = buildings;
      this.buildings.bind('remove', function(building) {
        this.workspaces.remove(building);
      }, this);

      this.workspaces.bind('playerresolved', function() {
        this.players.nextTurn();
      }, this);
      this.workspaces.bind('allresolved', function() {
        this.feed();
      }, this);
      this.workspaces.bind('place', function() {
        var i=0,
          players = this.players;
        if (players.remainingWorkers() === 0) {
          this.players.gotoLeader();
          this.set('phase', 'resolve');
        } else {
          players.nextTurn();

          //Skip players with 0 workers left to place
          //There is probably a better place for this.
          //Maybe the players collection should know more
          //about phases?
          while (i++ < players.length && players.current().get('workers') === 0) {
            players.nextTurn();
          }
        }
      }, this);
      this.players.bind('allfed', function() {
        this.reset();
      }, this);
    },
    activate: function(workspace) {
      this[this.get('phase')](workspace);
    },
    place: function(workspace) {
      var players = this.players,
        player = players.current(),
        workers;

      workers = parseInt(workers);
      if(workspace.canPlace(player) && this.hutrule.isSatisfied(workspace)){
        workspace.place(player);
      }
    },
    resolve: function(workspace) {
      var player = this.players.current();
      if(workspace.canResolve(player)) {
        workspace.resolve(player);
      }
    },
    feed: function() {
      this.players.feed();
    },
    reset: function() {
      this.players.resetAll();
      this.workspaces.reset();
      this.civilizationCards.deal(this.workspaces);
      this.checkForEndGame();
    },
    checkForEndGame: function() {
      //TODO - check if there are no more culture cards as well
      var gameover = this.buildings.empty(),
        players = this.players;
      if (gameover) {
        this.trigger('gameover', players.winner());
      } else {
        players.advanceLeaderToken();
        this.set('phase', 'place');
      }
    },
    maxPlayers : function(){
      return this.players.length - 1;
    }
  });
});
