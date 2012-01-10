define([
    'underscore',
    'backbone',
    'src/models/building'
  ], function(_, Backbone, Building) {
  var Buildings = Backbone.Collection.extend({
    model: Building,
    top: function() {
      return this.at(0);
    }
  });

  //Special "Deck" class that preloads all of the buildings
  return Buildings.extend({
    initialize: function() {
      var deck = [
        new Building({  //Building 1
          value: 13,
          cost: {
            wood: 1,
            brick: 1,
            gold: 1
          }
        }),
        new Building({  //Building 12
          value: 14,
          cost: {
            wood: 1,
            stone: 1,
            gold: 1
          }
        }),
        new Building({  //Building 13
          value: 10,
          cost: {
            wood: 2,
            brick: 1
          }
        }),
        new Building({  //Building 14
          value: 13,
          cost: {
            wood: 1,
            brick: 1,
            gold: 1
          }
        }),
        new Building({  //Building 15
          value: 13,
          cost: {
            brick: 2,
            stone: 1
          }
        }),
        new Building({  //Building 16
          value: 14,
          cost: {
            brick: 1,
            stone: 2
          }
        }),
        new Building({  //Building 18
          value: 11,
          cost: {
            wood: 1,
            brick: 2
          }
        }),
        new Building({  //Building 20
          value: 12,
          cost: {
            wood: 1,
            brick: 1,
            stone: 1
          }
        }),
        new Building({  //Building 21
          value: 13,
          cost: {
            wood: 1,
            stone: 2
          }
        }),
        new Building({  //Building 23
          value: 14,
          cost: {
            wood: 1,
            stone: 1,
            gold: 1
          }
        }),
        new Building({  //Building 24
          value: 16,
          cost: {
            stone: 2,
            gold: 1
          }
        }),
        new Building({  //Building 26
          value: 14,
          cost: {
            brick: 2,
            gold: 1
          }
        }),
        new Building({  //Building 27
          value: 11,
          cost: {
            wood: 2,
            stone: 1
          }
        }),
        new Building({  //Building 28
          value: 12,
          cost: {
            wood: 1,
            brick: 1,
            stone: 1
          }
        }),
        new Building({  //Building 4
          value: 15,
          cost: {
            brick: 1,
            stone: 1,
            gold: 1
          }
        }),
        new Building({  //Building 6
          value: 12,
          cost: {
            wood: 2,
            gold: 1,
          }
        }),
        new Building({  //Building 8
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
      var size = Math.floor(deck.length/4);
      for (var i=0; i<4; ++i) {
        this.add(new Buildings(deck.slice(i*size, i*size+size)));
      }
    }
  });
});
