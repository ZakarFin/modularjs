define([
    'intern!tdd',
    'intern/chai!assert',
    'lodash',
    '../src/eventbus'
], function(tdd, assert, _, EventBus) {
    tdd.suite('EventBus', function() {

        tdd.test('adding and removing listeners', function() {
            var bus = new EventBus();
            var success = bus.on("my-event", 'value');
            assert(!success, "Can't insert non-function values");
            var count = 0;
            var callback = function() {
                count++;
            };
            success = bus.on("my-event", callback);
            assert(success, "Can insert functions");
            bus.trigger('my-event');
            assert.equal(count, 1, "Function should have been called");


            var count2 = 0;
            var callback2 = function() {
                count2++;
            };
            bus.on("my-event", callback2);
            var listenerCount = bus.trigger('my-event');
            assert.equal(listenerCount, 2, "Two notified listeners");
            assert.equal(count, 2, "Function should have been called again");
            assert.equal(count2, 1, "The other function should have been called too");

            // try to register again
            success = bus.on("my-event", callback);
            assert(!success, "Can't re-register the same listener");

            // try to unregister
            bus.off('my-event', callback);
            var listenerCount2 = bus.trigger('my-event');
            assert.equal(listenerCount2, 1, "Only one listener");
            assert.equal(count, 2, "Unregister should work");
            assert.equal(count2, 2, "The other function should have been called still");
        });
        tdd.test('event passing', function() {
            var bus = new EventBus();
            var value = null;
            var callback = function(event) {
                value = event;
            };
            bus.on("my-event", callback);
            bus.trigger('my-event', { test : 'my value'});

            assert.equal(value.test, 'my value', "Event should have been passed");
        });

        tdd.test('zero listeners tests', function() {
            var bus = new EventBus();
            var count = bus.trigger('my-event', { test : 'my value'});
            assert.equal(count, 0, "No listeners, no called listeners");

            var success = bus.off('my-event', function() {});
            assert(!success, "Can't unregister something that isn't there");

            success = bus.on('my-event');
            assert(!success, "Can't register to an event without listener");
        });
    });
});
