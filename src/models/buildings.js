define([
    'backbone',
    'src/models/building'
  ], function(Backbone, Building) {
  var buildings = [
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
    })
  ];

  var Buildings = Backbone.Collection.extend({
    model: Building,
    split: function() {
      //TODO - split into 4 buildings collections and return
    }
  });

  //Treat the deck as a sort of singleton by returning
  //an instance to requirejs
  var deck = new Buildings();
  deck.add(buildings);
  return deck;
});
