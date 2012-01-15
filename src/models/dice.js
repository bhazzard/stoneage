define(function() {
  function Dice(count) {
    this.count = count;
    this.dice = [];
  };

  Dice.prototype.roll = function() {
    this.sum = 0;
    for (var i=0; i<this.count; i++) {
      this.dice[i] = Math.floor(Math.random() * 6) + 1;
      this.sum += this.dice[i];
    }
    return this.sum;
  };

  return Dice;
});
