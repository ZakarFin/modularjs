(function(global, factory) {
  if (typeof define === "function" && define.amd) define(["lodash"], factory);
  else if (typeof module === "object")  module.exports = factory;
  else {
    // lodash expected as global "_"
    global.Storage = factory(_);
  }
}((typeof window === 'object' && window) || this, function(_) {

  var setterGetter = function setterGetterFn(collection, key, value, defaultValue, validator) {
    if (!collection) {
      return;
    }

    // setter
    if (key && value) {
      var currentValue = collection[key];

      // validate if validator is provided, pass is value and previous value
      if (typeof validator === 'function' && !validator(value, currentValue)) {
        return false;
      }

      collection[key] = value;
      return true;
    }

    // getters
    if (!key) {
      // get registered keys
      var result = [];
      _.forIn(collection, function(_value, _key) {
        result.push(_key);
      });
      return result;
    }
    else {
      // return values registered for name
      return collection[key] || defaultValue;
    }
  };
  /*
  Returns an object with given methodName (defaults to 'data' if missing -> uses options as first param)
  options is an (optional) object with keys:
  - defaultValue : value to use if key doesn't have a value
  - validator : function that will receive the value to be inserted and the current value as params
  
  Returns an object with functions: 
  - reset(key) : removes value from the key or resets the whole storage if omitted
  - data(key, value) : 
      - the actual method name can be overridden with constructor arg (defaults to data)
  */
  var Storage = function(methodName, options) {
    // normalize params
    if (typeof methodName !== 'string') {
      options = methodName;
      methodName = null;
    }

    methodName = methodName || "data";
    if (typeof options !== 'object') {
      options = {};
    }

    var _collection = {};
    var _me = {
      reset: function(key) {
        if (!key) {
          // do we need to loop and delete here to save memory? 
          _collection = {};
        }
        else {
          delete _collection[key];
        }
      }
    };
    _me[methodName] = function(key, value) {
      return setterGetter(_collection, key, value, options.defaultValue, options.validator);
    };
    return _me;
  };
  return Storage;
}));
