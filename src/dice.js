define(function() {
	function Dice() {
		this._quantity = 0;
		this._value = 0;
		this._sides = 6;
	};
	
	Dice.prototype.sides = function(sides) {
		if (sides) {
			this._sides = sides;
		}
		return this._sides;
	}
	
	Dice.prototype.quantity = function(quantity) {
		if (quantity) {
			this._quantity = quantity;
		}
		return this._quantity;
	}
	
	Dice.prototype.value = function(value) {
		if (value) {
			this._value = value;
		}
		return this._value;
	}
	
	Dice.prototype.roll = function() {
		var total = 0, roll = 0;
		for (loop=0; loop < this.quantity(); loop++) {
			roll = Math.round(Math.random() * this.sides()) % this.sides() + 1;
			total += roll;
		}
		this.value(total);
	}
	
	return Dice;
});