
module.exports = function(cb, rate) {
    var timeout;

    return function(event) {
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            cb(event);
        }, rate || 300);
    };
};
