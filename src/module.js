(function (global, factory) {
    if (typeof define === "function" && define.amd) define(["lodash"], factory);
    else if (typeof module === "object")  module.exports = factory;
    else {
        // lodash expected as global "_"
        global.Module = factory(_);
    }
}(( typeof window === 'object' && window ) || this, function(_) {

    var Module = function(Registry, name, basedir) {
        basedir = basedir || './';
        var _name = name;
        var filelist = [];
        var _loadImplementation = function(done) {
            // TODO: transform filelist to handle json and templates
            // 1) require impl files + styles
            // 2) require json + templates as resources and call done() with them(?)
            // TODO: maybe handle localization like override and merge the json to the "inherited" one
            var resources = {};
            require(filelist, function() {
                done(resources);
            });
        };

        return {
            createInstance : function(name, config, done) {
                // normalize params
                if(typeof done !== 'function') {
                    config = name;
                    done = config;
                }
                if(typeof done !== 'function') {
                    done = config;
                    name = undefined;
                }
                if(typeof done !== 'function') {
                    // log('No done callback');
                    return; 
                }
                // do we need name at all?
                this.getFileList(function() {
                    _loadImplementation(function(resources) {
                        var instance = {};
                        if(_.isObject(config)) {
                            _.forIn(config, function(value, key) {
                                instance[key] = value;
                            });
                        }
                        // var instance = _startMainFile(files, config, resources);
                        // log('Created an instance of module ' + _name + ' with name ' + name)
                        done(instance);
                    });
                });
            },
            getFileList : function(done) {
                /*
                [
                    { file : "folder/file.js" },   // type == js
                    { file : "folder/file.css" },  // type == style
                    { file : "folder/file.html" }, // type == template
                    { file : "locale/en.json" }    // type == localization
                ]
                */
                // TODO:
                // 1) try minified.js + css + json + templates?
                // 2) try generated-filelist.json for dev-version
                if(filelist.length === 0) {
                    // 3) log("Couldn't find implementation files for bundle " + _name)
                }
                done(filelist);
            },
            // enables overriding a file or two/changing resources for bundle
            // while getting the implementation from another bundle
            loadFilesFromModule : function(name, options, done) {
                // options might exclude files from original module
                var parent = Registry.create(name);
                parent.getFileList(function(list) {
                    // requires inherited : true flag for filelist items if we 
                    // wan't to use them as baseline with partial override
                    filelist = filelist.concat(list);
                    done();
                });


            }

        };
    };
    return Module;
}));