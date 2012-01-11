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
      var size = Math.floor(deck.length/4), piles = [];
      for (var i=0; i<4; ++i) {
        piles.push(new Buildings(deck.slice(i*size, i*size+size)));
      }
      this.set('piles', piles);
    }
  });
});