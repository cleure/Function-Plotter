
module.exports = function(range) {
    return {
        'inX': inX,
        'outX': outX,
        'inY': inY,
        'outY': outY
    };
    
    function inX(value) {
        return (value + range) * 0.5;
    }
 
    function outX(value) {
        return value * 2 - range;
    }
 
    function inY(value) {
        return (value * -1 + range) * 0.5;
    }
 
    function outY(value) {
        return ((value * 2) - range) * -1;
    }
};
