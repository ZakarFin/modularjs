// add any tests to include as dependency
define([
    'tests/class-definition',
    'tests/storage',
    'tests/eventbus',
    'tests/module'], function(){
        require.config({
            paths : {
                //create alias to plugins (not needed if plugins are on the baseUrl)
                async: 'bower_components/requirejs-plugins/src/async',
                font: 'bower_components/requirejs-plugins/src/font',
                image: 'bower_components/requirejs-plugins/src/image',
                text: 'bower_components/requirejs-plugins/lib/text',
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