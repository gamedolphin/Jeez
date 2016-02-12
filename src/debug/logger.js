var Logger = function() {};

Logger.prototype.log = function(obj) {
  if(__DEV__) {
    console.log(obj);
  }
};
