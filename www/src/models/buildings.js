define([
    'underscore',
    'backbone',
    'src/models/building',
    'src/models/cost'
  ], function(_, Backbone, Building, Cost) {
  return Backbone.Collection.extend({
    model: Building,
    initialize: function(models, options) {
      var deck = [
        new Building({
          id: 1,
          cost: new Cost({
            wood: 1,
            brick: 1,
            gold: 1
          })
        }),
        new Building({
          id: 2,
          cost: new Cost({
            any: 5,
            kinds: 2
          })
        }),
        new Building({
          id: 3,
          cost: new Cost({
            any: 4,
            kinds: 2
          })
        }),
        new Building({
          id: 4,
          cost: new Cost({
            brick: 1,
            stone: 1,
            gold: 1
          })
        }),
        new Building({
          id: 5,
          cost: new Cost({
            any: 5,
            kinds: 4
          })
        }),
        new Building({
          id: 6,
          cost: new Cost({
            wood: 2,
            gold: 1,
          })
        }),
        new Building({
          id: 7,
          cost: new Cost({
            any: 4,
            kinds: 4
          })
        }),
        new Building({
          id: 8,
          cost: new Cost({
            brick: 1,
            stone: 1,
            gold: 1
          })
        }),
        new Building({
          id: 9,
          cost: new Cost({
            atmost: 7
          })
        }),
        new Building({
          id: 10,
          cost: new Cost({
            atmost: 7
          })
        }),
        new Building({
          id: 11,
          cost: new Cost({
            atmost: 7
          })
        }),
        new Building({
          id: 12,
          cost: new Cost({
            wood: 1,
            stone: 1,
            gold: 1
          })
        }),
        new Building({
          id: 13,
          cost: new Cost({
            wood: 2,
            brick: 1
          })
        }),
        new Building({
          id: 14,
          cost: new Cost({
            wood: 1,
            brick: 1,
            gold: 1
          })
        }),
        new Building({
          id: 15,
          cost: new Cost({
            brick: 2,
            stone: 1
          })
        }),
        new Building({
          id: 16,
          cost: new Cost({
            brick: 1,
            stone: 2
          })
        }),
        new Building({
          id: 17,
          cost: new Cost({
            any: 5,
            kinds: 1
          })
        }),
        new Building({
          id: 18,
          cost: new Cost({
            wood: 1,
            brick: 2
          })
        }),
        new Building({
          id: 19,
          cost: new Cost({
            any: 4,
            kinds: 1
          })
        }),
        new Building({
          id: 20,
          cost: new Cost({
            wood: 1,
            brick: 1,
            stone: 1
          })
        }),
        new Building({
          id: 21,
          cost: new Cost({
            wood: 1,
            stone: 2
          })
        }),
        new Building({
          id: 22,
          cost: new Cost({
            any: 5,
            kinds: 3
          })
        }),
        new Building({
          id: 23,
          cost: new Cost({
            wood: 1,
            stone: 1,
            gold: 1
          })
        }),
        new Building({
          id: 24,
          cost: new Cost({
            stone: 2,
            gold: 1
          })
        }),
        new Building({
          id: 25,
          cost: new Cost({
            any: 4,
            kinds: 3
          })
        }),
        new Building({
          id: 26,
          cost: new Cost({
            brick: 2,
            gold: 1
          })
        }),
        new Building({
          id: 27,
          cost: new Cost({
            wood: 2,
            stone: 1
          })
        }),
        new Building({
          id: 28,
          cost: new Cost({
            wood: 1,
            brick: 1,
            stone: 1
          })
        })
      ];

      deck = _.shuffle(deck);
      
      //Split into 4 even piles
      var size = Math.floor(deck.length/4),
        players = options.players,
        pile;
      for (var i=0; i<players; ++i) {
        pile = deck.slice(i*size, i*size+size);
        _(pile).each(function(building, position) {
          building.set('buildings', this);
          building.set('pile', i+1);
          building.set('position', position);
          building.set('name', 'building building-back building-pile' + (i+1) + ' stack' + (position+1));
          this.add(building);
        }, this);
      }

      this.players = players;
      this.each(function(building) {
        building.reset();
      });
    },
    empty: function() {
      for (var i=1; i<=this.players; ++i) {
        if (!this.any(function(b) { return b.get('pile') === i })) {
          return true;
        }
      }
      return false;
    },
    onTop: function(building) {
      return !this.any(function(b) {
        return b.get('pile') === building.get('pile') &&
          b.get('position') < building.get('position');
      });
    }
  });
});
