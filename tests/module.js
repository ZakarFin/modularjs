define([
    'intern!tdd',
    'intern/chai!assert',
    'lodash',
    '../src/module',
    '../src/registry'
], function(tdd, assert, _, Module, Registry) {
    tdd.suite('Module', function() {

        tdd.test('empty getFileList', function() {

            var dfd = this.async(1000);

            var module = new Module(Registry, 'simplemodule');
            module.getFileList(dfd.callback(function(list) {
                assert.ok(list, 'Should always return non null value');
                assert.isTrue(_.isArray(list), 'Should always return a list');
            }, dfd.reject.bind(dfd)));

        });

        tdd.test('createInstance with no source', function() {

            var dfd = this.async(1000);

            var module = new Module(Registry, 'simplemodule');
            module.createInstance(dfd.callback(function(instance) {
                assert.ok(instance, 'Should always return non null value');
                assert.isTrue(_.isObject(instance), 'Should always return an object');
            }, dfd.reject.bind(dfd)));

        });
    });
});
