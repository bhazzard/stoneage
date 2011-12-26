require([
   "src/engine",
   "lib/microevent"
], function(Engine) {
   var TestEvents = function() {};
   MicroEvent.mixin(TestEvents);

   module("Given an engine with a valid pickPlayers callback", {
      setup: function() {
         var events = new TestEvents(),
         engine = new Engine({
            pickPlayers: function() {
               events.trigger('playersPicked')

               return [{
                  color: 'red'
               }, {
                  color: 'green'
               }];
            }
         });

         this.engine = engine;
         this.events = events;
      } 
   });

   asyncTest("When the engine is started", function() {
      expect(1);

      var self = this;
      this.events.bind('playersPicked', function(players) {
         ok(true, "It should call the playersPicked callback");

         start();
      });

      this.engine.start();
   });
});
