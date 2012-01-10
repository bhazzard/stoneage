define([
    'backbone',
    'src/models/building'
  ], function(Backbone, Building) {
  return Backbone.Collection.extend({
    initialize: function() {
      this.add([
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
      ]);
    }
  });
});
