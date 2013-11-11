var Utils = {
  // returns a random integer between min and max
  // via: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FMath%2Frandom
  randBetween: function(min, max, floating) {
    if (floating) {
      return Math.random() * (max - min + 1) + min;
    } else {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
  },

  // mixin function, gives objects new functons from other objects
  mixin: function(to, from) {
    for(var prop in from.prototype) {
      if(!to.prototype[prop]) {
        to.prototype[prop] = from.prototype[prop];
      }
    }
  },

  clearCanvas: function() {
    return context.clearRect(0, 0, canvas.width, canvas.height);
  }
};

if (typeof module !== 'undefined') module.exports = Utils;