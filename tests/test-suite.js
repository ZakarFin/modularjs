// add any tests to include as dependency
define([
    'tests/class-definition',
    'tests/storage',
    'tests/eventbus',
    'tests/module'], function(){
        require.config({
            paths : {
                //create alias to plugins (not needed if plugins are on the baseUrl)
                text: 'bower_components/requirejs-text/text',
                // text needs to be newer version than plugins provide
                // otherwise it will break node (intern) environment since it doesn't handle error callback
                // the try/catch is the key here: https://github.com/requirejs/text/commit/4ec1d5d5694ac589b0c56fb806195aa6fbf256da
                async: 'bower_components/requirejs-plugins/src/async',
                font: 'bower_components/requirejs-plugins/src/font',
                image: 'bower_components/requirejs-plugins/src/image',
                json: 'bower_components/requirejs-plugins/src/json',
                mdown: 'bower_components/requirejs-plugins/src/mdown',
                propertyParser : 'bower_components/requirejs-plugins/src/propertyParser',
                markdownConverter : 'bower_components/requirejs-plugins/lib/Markdown.Converter'
            }
        });
    return {
        unit : arguments
    }
});