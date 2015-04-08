# Modular JS experiment 

[![Build Status](https://travis-ci.org/ZakarFin/modularjs.svg?branch=master)](https://travis-ci.org/ZakarFin/modularjs) 
[![Dependency Status](https://gemnasium.com/ZakarFin/modularjs.svg)](https://gemnasium.com/ZakarFin/modularjs)

### TODO:

* Finalize module loading (libs(dependencies), resources (css/locale.json/templates))
* Finalize module inheritance
* Add a hook to catch new typed definitions in registry perhaps using eventbus? (event like ~TypedClassDefined)
* Maybe make storage a class that can be inherited?
* Maybe make eventbus a class that can be inherited or try hooking registry typedClass event to attach eventbus to class thats typed ~Observable?

### Install tools packages

	npm install

Note! This installs npm pre-commit module which overwrites any git pre-commit hooks you might have

### Install libraries needed by frontend code

    npm run loadlibs

### To run tests

Locally:

	npm test

Using https://saucelabs.com:

    export SAUCE_USERNAME=<username>
    export SAUCE_ACCESS_KEY=<access key>
    npm run saucetest

### To run JS Hint

	npm run lint

### To run Browserify (creates src-all.js file)

	npm run browsersify

### To check code style and fix issues with JSCS

Check http://jscs.info for details

    npm run format
