require.paths.unshift(__dirname + '/../lib');

var path = require('path'),
    assert = require('assert'),
    assertLintFree = require('node-assert-lint-free'),
    namespaces = require('namespaces');

function dynamicSetArgsFunction(/* obj, [key], val */) {
    var setArgs = parseSetArgs(arguments);
    return setArgs;
}

function dynamicGetArgsFunction(/* obj, [key] */) {
    var getArgs = parseGetArgs(arguments);
    return getArgs;
}

var emptyObj, simpleObj, complexObj;

var namespaceTests = {
    before: function (fn) {
        emptyObj = {};

        simpleObj = {
            test: 'test'
        };

        complexObj = {
            test: 'test',
            test2: {
                test2_1: 'test 2.1',
                test2_2: {
                    test2_2_1: 'test 2.2.1',
                    test2_2_2: 'test 2.2.2'
                }
            },
            test3: {
                test3_1: 'test 3.1'
            }
        };
        fn();
    },
    'lint free': function(done) {
        var roots = [
            path.join(__dirname, '../lib'),
            path.join(__dirname)
        ];
        assertLintFree(roots);
        done();
    },
    'parse set args with all arguments': function(done) {
        var parsedArgs = dynamicSetArgsFunction(simpleObj, 'testKey', 'testVal');
        assert.ok(parsedArgs.obj === simpleObj, "obj not found");
        assert.ok(parsedArgs.key === 'testKey', "key not found");
        assert.ok(parsedArgs.val === 'testVal', "val not found");
        done();
    },
    'parse set args wthout key argument': function(done) {
        var parsedArgs = dynamicSetArgsFunction(simpleObj, 'testVal');
        assert.ok(parsedArgs.obj === simpleObj, "obj not found");
        assert.ok(parsedArgs.key === null, "key should be null");
        assert.ok(parsedArgs.val === 'testVal', "val not found");
        done();
    },
    'parse get args with all arguments': function(done) {
        var parsedArgs = dynamicGetArgsFunction(simpleObj, 'testKey');
        assert.ok(parsedArgs.obj === simpleObj, "obj not found");
        assert.ok(parsedArgs.key === 'testKey', "key not found");
        done();
    },
    'parse get args without key argument': function(done) {
        var parsedArgs = dynamicGetArgsFunction(simpleObj);
        assert.ok(parsedArgs.obj === simpleObj, "obj not found");
        assert.ok(parsedArgs.key === null, "key should be null");
        done();
    },
    'find namespace for get args': function(done) {
        var parsedArgs = dynamicGetArgsFunction(complexObj, 'test2.test2_2.test2_2_2');
        var namespace = findNamespace(parsedArgs);
        assert.ok(namespace === 'test 2.2.2', "could not find namespace");
        done();
    },
    'find namespace for get args without top namespace': function(done) {
        // don't include top namespace value
        var parsedArgs = dynamicGetArgsFunction(complexObj, 'test2.test2_2.test2_2_2');
        var namespace = findNamespace(parsedArgs, false);
        assert.ok(namespace === complexObj.test2.test2_2, "could not find namespace");
        done();
    },
    'find namespace for get args non-existent key': function(done) {
        var parsedArgs = dynamicGetArgsFunction(complexObj, 'test2.test2_2.test2_2_2_1');
        var namespace = findNamespace(parsedArgs);
        assert.ok(namespace === undefined, "namespace should be undefined");
        done();
    },
    'find namespace for set args': function(done) {
        var parsedArgs = dynamicSetArgsFunction(complexObj, 'test2.test2_2.test2_2_2', 'testFindNamespaceForSetArgs');
        var namespace = findNamespace(parsedArgs);
        assert.ok(namespace === 'test 2.2.2', "could not find namespace");
        done();
    },
    'find namespace for set args without top namespace': function(done) {
        // don't include top namespace value
        var parsedArgs = dynamicSetArgsFunction(complexObj, 'test2.test2_2.test2_2_2', 'testFindNamespaceForSetArgsWithoutTopNamespace');
        var namespace = findNamespace(parsedArgs, false);
        assert.ok(namespace === complexObj.test2.test2_2, "could not find namespace");
        done();
    },
    'find namespace for set args on existent key': function(done) {
        // non-existent key
        var parsedArgs = dynamicSetArgsFunction(complexObj, 'test2.test2_2.test2_2_2_1', 'testFindNamespaceForSetArgsNonExistentKey');
        var namespace = findNamespace(parsedArgs);
        assert.ok(namespace === undefined, "namespace should be undefined");
        done();
    },
    'create namespace': function(done) {
        var space = createNamespace(simpleObj, ['test2', 'test2_1']);
        assert.ok(simpleObj.test2.test2_1 !== undefined, "namespace was not created");
        assert.ok(space !== undefined, "namespace was not created");
        done();
    },
    'set value': function(done) {
        setValue(complexObj, 'test2.test2_2.test2_2_2', 'testSetValue');
        assert.ok(complexObj.test2.test2_2.test2_2_2 === 'testSetValue', "namespace was not set");
        done();
    },
    'get value with new key': function(done) {
        // new key
        setValue(complexObj, 'test2.test2_2.test2_2_3', 'testSetValueWithNewKey');
        assert.ok(complexObj.test2.test2_2.test2_2_3 === 'testSetValueWithNewKey', "namespace was not set");
        done();
    },
    'set value deep non-existent key': function(done) {
        setValue(complexObj, 'test2.test2_2.test2_2_3.test2_2_3_1.test2_2_3_1_1', 'testSetValueDeepNonExistentKey');
        assert.ok(complexObj.test2.test2_2.test2_2_3.test2_2_3_1.test2_2_3_1_1 === 'testSetValueDeepNonExistentKey', "namespace was not set");
        done();
    },
    'set value in empty obj': function(done) {
        setValue(emptyObj, 'test', 'testSetValueInEmptyObj1');
        assert.ok(emptyObj.test === 'testSetValueInEmptyObj1', "namespace was not set");
        done();
    },
    'set value deep in empty obj': function(done) {
        setValue(emptyObj, 'test.test1.test2', 'testSetValueInEmptyObj2');
        assert.ok(emptyObj.test.test1.test2 === 'testSetValueInEmptyObj2', "namespace was not set");
        done();
    },
    'get value': function(done) {
        var namespace = getValue(complexObj, 'test2.test2_2.test2_2_2');
        assert.ok(namespace === 'test 2.2.2', "namespace was not found");
        done();
    },
    'get value without key': function(done) {
        var namespace = getValue(complexObj);
        assert.ok(namespace === complexObj, "namespace was not found");
        done();
    }
};

module.exports = namespaceTests;
