//jscs:disable requirePaddingNewLinesAfterBlocks
(function(global, factory) {
   if (typeof define === 'function' && define.amd) define(['lodash', './storage', './validator'], factory);
   else if (typeof module === 'object')  module.exports = factory;
   else {
      // lodash expected as global "_"
      global.EventBus = factory(_, global.Storage, global.Validator);
   }
}((typeof window === 'object' && window) || this, function(_, Storage, Validator) {
   //jscs:enable requirePaddingNewLinesAfterBlocks

   var EventBus = function() {

      var store = new Storage('subscribers', {
         defaultValue: []
      });

      return {
         'on': function(event, handlerFn) {
            // only allow functions to be stored as handlers
            if (typeof handlerFn !== 'function') {
               return false;
            }

            var list = store.subscribers(event);

            // check for duplicates
            if (Validator.existsInList(list, handlerFn)) {
               return false;
            }

            list.push(handlerFn);
            return store.subscribers(event, list);
         },

         'off': function(event, handlerFn) {
            var currentSubs = store.subscribers(event);

            // remove if handlerFn found in currentSubs
            var success = false;
            for (var n = 0; n < currentSubs.length; n++) {
               if (currentSubs[n] === handlerFn) {
                  currentSubs.splice(n, 1);
                  success = true;
                  break;
               }
            }

            return success;
         },

         'trigger': function(event, data) {
            var currentSubs = store.subscribers(event);
            var count = 0;
            _.each(currentSubs, function(sub) {
               sub(data, event);
               count++;
            });

            return count;
         }
      };
   };

   return EventBus;
}));
