// Useful for parsing arguments dynamically for passing to setValue
parseSetArgs = exports.parseSetArgs = function(_args) {
    var args = {
        obj: _args[0]
    };
    if (_args.length <= 2) {
        args.key = null;
        args.val = _args[1];
    } else {
        args.key = _args[1];
        args.val = _args[2];
    }
    return args;
};

// Useful for parsing arguments dynamically for passing to getValue
parseGetArgs = exports.parseGetArgs = function(_args) {
    var args = {
        obj: _args[0]
    };
    if (_args.length === 1) {
        args.key = null;
    } else if (_args.length === 2) {
        args.key = _args[1];
    }
    return args;
};

findNamespace = exports.findNamespace = function(args, includeTop) {
    if (typeof includeTop === 'undefined') {
        includeTop = true;
    }
    if (args.key === null) {
        return args.obj;
    } else {
        var scopeParts = args.key.split('.');
        var namespace = args.obj;
        var top = includeTop ? scopeParts.length : (scopeParts.length - 1);
        for (var i = 0; i < top; i++) {
            if (!namespace) {
                return undefined;
            }
            namespace = namespace[scopeParts[i]];
        }
        return namespace;
    }
};

createNamespace = exports.createNamespace = function(space, keyParts) {
    var node = space;
    keyParts.forEach(function(keyPart) {
        node[keyPart] = node[keyPart] ? node[keyPart] : {};
        node = node[keyPart];
    });
    return node;
};

setValue = exports.setValue = function(/* obj, key, val */) {
    var args = parseSetArgs(arguments);
    var space = findNamespace(args, false);
    var keyParts = args.key.split('.');
    if (!space) {
        space = createNamespace(args.obj, keyParts.slice(0, (keyParts.length - 1)));
    }
    var topKey = keyParts[(keyParts.length - 1)];
    space[topKey] = args.val;
};

getValue = exports.getValue = function(/* obj, [key] */) {
    var args = parseGetArgs(arguments);
    var space = findNamespace(args);
    return space;
};
