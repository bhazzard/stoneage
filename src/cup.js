define(['src/die'], function(Die) {
  function Cup() {
    this._dieCount = 0;
  };

  Cup.prototype.dieCount = function(dieCount){
    if(dieCount){
      this._dieCount = dieCount;
    }
    return this._dieCount;
  };

  Cup.prototype.result = function(result){
    if (result) {
      this._result = result;
    }
    return this._result;
  };

  Cup.prototype.rollDice = function() {
    var sum = 0;
    for(var i = 0; i < this.dieCount(); i++){
      sum += new Die().roll();
    }
    this.result(sum);
  };

  return Cup;
});
