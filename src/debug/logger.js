var Logger = function() {};

Logger.prototype.log = function(obj) {
  if(__DEV__) {
    console.log(obj);
  }
};

Logger.prototype.warn = function(obj) {
    console.warn(obj);
};

module.exports = new Logger();
