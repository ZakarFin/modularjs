# Modular JS experiment [![Build Status](https://travis-ci.org/ZakarFin/modularjs.svg?branch=master)](https://travis-ci.org/ZakarFin/modularjs)

### TODO:

* Remove append from Storage
* Finalize module loading
* Finalize module inheritance
* Finalize and test eventbus

### Install tools packages

	npm install

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

	npm run analyse

### To run Browserify (creates src-all.js file)

	npm run browsersify
	