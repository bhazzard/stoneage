define(function() {
	function Dice() {
		this._sides = 6;
	};
	
	Dice.prototype.sides = function(sides) {
		if (sides) {
			this._sides = sides;
		}
		return this._sides;
	}
	
	Dice.prototype.roll = function() {
        return Math.round(Math.random() * this.sides()) % this.sides() + 1;
	};
	
	return Dice;
});