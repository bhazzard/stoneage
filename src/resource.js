define(function() {
   function Resource(type, cost) {
      this._type = type;
      this._cost = cost;
   };

   Resource.prototype.value = function() {
      return this._cost;
   };

   return Resource;
});
