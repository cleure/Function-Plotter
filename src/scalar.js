
module.exports = function(padding) {
    padding = padding || 0.01;
    var paddingInverse = 1.0 - padding;

    function scalarIn(x, s) {
        return x * (1.0 / s);
    }
 
    function scalarOut(x, s) {
        return Math.floor(getCoordPadded(x) / (1.0 / s));
    }
 
    function getCoordPadded(x) {
        return x * paddingInverse + padding;
    }
    
    return {
        'in': scalarIn,
        'out': scalarOut
    };
};
