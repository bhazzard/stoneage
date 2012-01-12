define([
    'underscore',
    'backbone',
    'src/models/workspace',
    'src/models/building'
  ], function(_, Backbone, Workspace, Building) {
  var BuildingPile = Workspace.extend({
    initialize: function() {
      this.flip();
    },
    top: function() {
      return this.get('pile')[0];
    },
		canPlace : function(player) {
      return this.workers() === 0 && player.get('workers') > 0;
		},
    place: function(player) {
      Workspace.prototype.place.call(this, player, 1);
    },
    resolve: function(player) {
      var building = this.top(),
        workers = this.workers(player.id);
      this.set(player.id, undefined);
      player.add('workers', workers);
      if (building.canPurchase(player) && confirm('Buy this building?')) {
        building.purchase(player);
        this.pop();
      }
      this.trigger('resolve', player);
    },
    pop: function() {
      this.get('pile').shift();
      if (this.empty()) {
        this.set('class', 'building-back');
      } else {
        this.set('class', 'building-empty');
      }
    },
    empty: function() {
      return !this.get('pile').length;
    },
    reset: function() {
      this.flip();
    },
    flip: function() {
      if (!this.empty()) {
        this.set('class', 'building' + this.top().id);
      }
    }
  });

  //Special "Deck" class that preloads all of the buildings
  return Backbone.Model.extend({
    initialize: function() {
      var deck = [
        new Building({
          id: 1,
          value: 13,
          cost: {
            wood: 1,
            brick: 1,
            gold: 1
          }
        }),
        new Building({
          id: 12,
          value: 14,
          cost: {
            wood: 1,
            stone: 1,
            gold: 1
          }
        }),
        new Building({
          id: 13,
          value: 10,
          cost: {
            wood: 2,
            brick: 1
          }
        }),
        new Building({
          id: 14,
          value: 13,
          cost: {
            wood: 1,
            brick: 1,
            gold: 1
          }
        }),
        new Building({
          id: 15,
          value: 13,
          cost: {
            brick: 2,
            stone: 1
          }
        }),
        new Building({
          id: 16,
          value: 14,
          cost: {
            brick: 1,
            stone: 2
          }
        }),
        new Building({
          id: 18,
          value: 11,
          cost: {
            wood: 1,
            brick: 2
          }
        }),
        new Building({
          id: 20,
          value: 12,
          cost: {
            wood: 1,
            brick: 1,
            stone: 1
          }
        }),
        new Building({
          id: 21,
          value: 13,
          cost: {
            wood: 1,
            stone: 2
          }
        }),
        new Building({
          id: 23,
          value: 14,
          cost: {
            wood: 1,
            stone: 1,
            gold: 1
          }
        }),
        new Building({
          id: 24,
          value: 16,
          cost: {
            stone: 2,
            gold: 1
          }
        }),
        new Building({
          id: 26,
          value: 14,
          cost: {
            brick: 2,
            gold: 1
          }
        }),
        new Building({
          id: 27,
          value: 11,
          cost: {
            wood: 2,
            stone: 1
          }
        }),
        new Building({
          id: 28,
          value: 12,
          cost: {
            wood: 1,
            brick: 1,
            stone: 1
          }
        }),
        new Building({
          id: 4,
          value: 15,
          cost: {
            brick: 1,
            stone: 1,
            gold: 1
          }
        }),
        new Building({
          id: 6,
          value: 12,
          cost: {
            wood: 2,
            gold: 1,
          }
        }),
        new Building({
          id: 8,
          value: 15,
          cost: {
            brick: 1,
            stone: 1,
            gold: 1
          }
        })
      ];

      deck = _.shuffle(deck);
      
      //Split into 4 even piles
      //NOTE - some buildings may go missing until we have all 28
      var size = Math.floor(deck.length/4),
        piles = [],
        players = this.get('players');
      for (var i=0; i<players; ++i) {
        piles.push(new BuildingPile({
          name: 'building-pile' + (i+1),
          pile: deck.slice(i*size, i*size+size)
        }));
      }
      this.set('piles', piles);
    }
  });
});
