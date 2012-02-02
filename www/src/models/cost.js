define([
    'underscore',
    'backbone'
  ], function(_, Backbone) {
  var resources = ['wood', 'brick', 'stone', 'gold'];
 
  return Backbone.Model.extend({
    met: function(payment) {
      var any = this.get('any'),
        kinds = this.get('kinds'),
        atmost = this.get('atmost'),
        total = payment.total();;
      if (any !== undefined && kinds !== undefined) {
        return total >= any && payment.kinds() === kinds;
      } else if (any !== undefined) {
        return total >= any;
      }
      if (atmost !== undefined) {
        return total > 0 && total <= atmost;
      }
      return false;
    },
    canAfford: function(player) {
      var any = this.get('any'),
        kinds = this.get('kinds'),
        atmost = this.get('atmost'),
        total = player.resourceCount();
      if (any !== undefined && kinds !== undefined) {
        return total >= any && player.kinds() >= kinds;
      } else if (any !== undefined) {
        return total >= any;
      } else if (atmost !== undefined) {
        return total > 0 && total <= atmost;
      } else {
        return _(resources).all(function(resource) {
          return player.get(resource) >= (this.get(resource) || 0);
        }, this);
      }
    },
    isFixed: function() {
      return _(resources).any(function(resource) {
        return this.get(resource) !== undefined;
      }, this);
    }
  });
});
