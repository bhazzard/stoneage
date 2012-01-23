define([
    'jquery',
    'underscore',
    'backbone',
    'jquery.mobile.support'
  ], function($, _, Backbone) {
  return Backbone.View.extend({
    delegateEvents: function() {
      var mappedEvents = {};
      if ($.support.touch && this.events) {
        _(this.events).chain().keys().each(function(key) {
          var mappedKey = key.replace(/^click/, 'tap'),
            handler = this.events[key];
          mappedEvents[mappedKey] = handler;
          //Make all tap handlers prevent default action
          this[handler] = _.wrap(this[handler], function(original, event) {
            if (event && event.preventDefault) {
              event.preventDefault();
            }
            original.call(this, event);
          });
        }, this);
        this.events = mappedEvents;
      }
      Backbone.View.prototype.delegateEvents.call(this);
    }
  });
});
