(function(global, factory) {
  if (typeof define === "function" && define.amd) define(["lodash"], factory);
  else if (typeof module === "object")  module.exports = factory;
  else {
    // lodash expected as global "_"
    global.Module = factory(_);
  }
}((typeof window === 'object' && window) || this, function(_) {

  var Module = function(Registry, name, basedir) {
    basedir = basedir || './';
    var _name = name;
    var filelist = [];
    var _loadImplementation = function(done) {
      // TODO: transform filelist to handle json and templates
      // 1) require impl files + styles
      // 2) require json + templates as resources and call done() with them(?)
      // TODO: maybe handle localization like override and merge the json to the "inherited" one
      var list = [];

      // generated based on fileliset
      list = filelist;

      // debug..
      var resources = {};
      if (list.length === 0) {
        done();
        return;
      }

      // FIXME: this index 0 nonsense is just wrong, fix ASAP please...
      if (filelist[0].type === 'impl') {
        done(list[0].value, resources);
      }
      else if (filelist[0].type === 'list') {
        // argh, my eyes...
        console.log(list[0].value[0].file);
        require([basedir + name + '/' + list[0].value[0].file], function(inst) {
          console.log('list require ' + inst);
          done(inst, resources);
        });
      }

    };

    var _loadFirstExisting = function(files, done, errorHandler) {
      var file = files.shift();

      // now loads just js, TODO: load minified css + other resources
      require([file.file], function(value) {
        console.log('got ' + file.file);

        //if(file.type === 'list') {
        file.value = value;

        //}
        filelist.push(file);
        done(filelist);
      }, function() {
        console.log('error loading ' + file.file);
        errorHandler();
      });
    };

    return {
      createInstance: function(name, config, done) {
        // normalize params
        if (typeof done !== 'function') {
          done = config;
          config = name;
        }

        if (typeof done !== 'function') {
          done = config;
          name = undefined;
        }

        if (typeof done !== 'function') {
          // log('No done callback');
          return {}; 
        }

        // do we need name at all?
        this.getFileList(function() {
          _loadImplementation(function(instance, resources) {
            // register bundle to Registry so next call to createInstance() can use it?
            instance = instance || {};
            if (_.isObject(config)) {
              _.forIn(config, function(value, key) {
                instance[key] = value;
              });
            }

            // determine main file and start it to get instance
            // var instance = _startMainFile(files, config, resources);
            // log('Created an instance of module ' + _name + ' with name ' + name)
            done(instance);
          });
        });
      },
      getFileList: function(done) {
        /*
        [
            { file : "folder/file.js" },   // type == js
            { file : "folder/file.css" },  // type == style
            { file : "folder/file.html" }, // type == template
            { file : "locale/en.json" }    // type == localization
        ]
        */
        
        // 1) try minified.js + css + json + templates?
        // 2) try generated-filelist.json for dev-version
        var filesToTry = [{
          file: basedir + name + '.min.js',
          type: 'impl'
        }, {
          file: 'json!' + basedir + name + '/generated.list.json',
          type: 'list'
        }
        /*, {
            file : basedir + name + '/module',
            type : 'impl'
        }*/];
        var errorHandler = function() {
          // file not found!!!
          if (filesToTry.length > 0) {
            // recursion if theres more options
            _loadFirstExisting(filesToTry, done, errorHandler);
            return;
          }

          if (filelist.length === 0) {
            // 3) log("Couldn't find implementation files for bundle " + _name)
          }

          done(filelist);
        };
        _loadFirstExisting(filesToTry, done, errorHandler);

      },

      // enables overriding a file or two/changing resources for bundle
      // while getting the implementation from another bundle
      loadFilesFromModule: function(name, options, done) {
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
