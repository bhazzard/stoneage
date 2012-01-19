define([
    'jquery',
    'underscore',
    'backbone',
    'jquery.mobile.support'
  ], function($, _, Backbone) {
  return Backbone.View.extend({
    delegateEvents: function() {
      var mappedEvents = {};
      if ($.support.touch) {
        _(this.events).chain().keys().each(function(key) {
          var mappedKey = key.replace(/^click/, 'tap');
          mappedEvents[mappedKey] = this.events[key];
        }, this);
        this.events = mappedEvents;
      }
      Backbone.View.prototype.delegateEvents.call(this);
    }
  });
});
