define(function() {
   function Facade(options) {
      this.options = options;
      options.placeWorkers('red', 'forest', 5);
   };

   return Facade;
});
