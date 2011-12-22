define(['src/dice'], function(Dice) {
	function Cup() {
        this._dieCount = 0;
	};

    Cup.prototype.dieCount = function(dieCount){
        if(dieCount){
            this._dieCount = dieCount;
        }
        return this._dieCount;
    };

    Cup.prototype.rollAllDice = function() {
        var sum = 0;
        for(var i = 0; i < this.dieCount(); i++){
            sum += new Dice().roll();
        }
        return sum;
    };

    return Cup;
});