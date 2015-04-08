(function(global, factory) {
  if (typeof define === "function" && define.amd) define(["lodash"], factory);
  else if (typeof module === "object")  module.exports = factory;
  else {
    // lodash expected as global "_"
    global.Storage = factory(_);
  }
}((typeof window === 'object' && window) || this, function(_) {
  return {
    existsInList: function(list, test) {
      return _.isArray(list) && _.find(list, function(existing) { return test === existing; });
    }
  };
}));
