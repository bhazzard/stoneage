define(function() {
   function Die() {
      this._sides = 6;
   };

   Die.prototype.sides = function(sides) {
      if (sides) {
         this._sides = sides;
      }
      return this._sides;
   }

   Die.prototype.roll = function() {
      return Math.round(Math.random() * this.sides()) % this.sides() + 1;
   };

   return Die;
});
