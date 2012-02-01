define([
    'underscore',
    'backbone',
    'src/models/civilizationcard'
  ], function(_, Backbone, CivilizationCard) {
  return Backbone.Collection.extend({
    model: CivilizationCard,
    initialize: function(models, options) {
      var deck = [
        new CivilizationCard({
          id: 1
        }),
        new CivilizationCard({
          id: 2
        }),
        new CivilizationCard({
          id: 3
        }),
        new CivilizationCard({
          id: 4
        }),
        new CivilizationCard({
          id: 5
        }),
        new CivilizationCard({
          id: 6
        }),
        new CivilizationCard({
          id: 7
        }),
        new CivilizationCard({
          id: 8
        }),
        new CivilizationCard({
          id: 9
        }),
        new CivilizationCard({
          id: 10
        }),
        new CivilizationCard({
          id: 11
        }),
        new CivilizationCard({
          id: 12
        }),
        new CivilizationCard({
          id: 13
        }),
        new CivilizationCard({
          id: 14
        }),
        new CivilizationCard({
          id: 15
        }),
        new CivilizationCard({
          id: 16
        }),
        new CivilizationCard({
          id: 17
        }),
        new CivilizationCard({
          id: 18
        }),
        new CivilizationCard({
          id: 19
        }),
        new CivilizationCard({
          id: 20
        }),
        new CivilizationCard({
          id: 21
        }),
        new CivilizationCard({
          id: 22
        }),
        new CivilizationCard({
          id: 23
        }),
        new CivilizationCard({
          id: 24
        }),
        new CivilizationCard({
          id: 25
        }),
        new CivilizationCard({
          id: 26
        }),
        new CivilizationCard({
          id: 27
        }),
        new CivilizationCard({
          id: 28
        }),
        new CivilizationCard({
          id: 29
        }),
        new CivilizationCard({
          id: 30
        }),
        new CivilizationCard({
          id: 31
        }),
        new CivilizationCard({
          id: 32
        }),
        new CivilizationCard({
          id: 33
        }),
        new CivilizationCard({
          id: 34
        }),
        new CivilizationCard({
          id: 35
        }),
        new CivilizationCard({
          id: 36
        })
      ];

      deck = _.shuffle(deck);
      
      this.add(deck);
    },
    empty: function() {
      return this.length === 0;
    },
    deal: function(workspaces) {
      var cards = workspaces.filter(function(workspace) {
        return workspace instanceof CivilizationCard;
      });
      _.each(cards, function(card, i) {
        card.set('space', i+1);
      });
      for (var i=cards.length + 1; i<=4; ++i) {
        var card = this.at(0);
        this.remove(card);
        card.set('space', i);
        workspaces.add(card);
      }
    }
  });
});
