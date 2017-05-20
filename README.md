# musicalscales

A javascript api for generating frequencies for use with the web audio API

## Please note this is a work in progress and is, as yet, untested

---

## Features

This package is designed to provide :

* A simple API for creating sets of frequencies
* Frequencies can be generated that are any number of semitones per octave
* An even or odd number of octaves can be generated
* For odd numbers of octaves an option is available for whether the remaining octave is lower or upper
* The centre frequency can be returned - useful for...

What it doesn't do:

* Does not allow for input of notes as letters
* Does not allow for input of chords by name


## Getting Started

It is recommended you install via [NPM](https://npmjs.com) where dependencies will be loaded automatically.

`npm install musicalscales`

musicalscales is configured to work with both [AMD](https://en.wikipedia.org/wiki/Asynchronous_module_definition) and [CJS](https://en.wikipedia.org/wiki/CommonJS) applications.

If you're using [Webpack](http://webpack.github.io/), [Browserify](http://browserify.org/) or some other CJS module loader simply require the module like so

`var MusicalScales = require('darkskyjs');`

or using ES6 import, like so

`import MusicalScales from 'musicalscales'`

and use the `MusicalScales` constructor like so:

`var musicalscales = new MusicalScales()`

You can then use one of the three methods listed below to retrieve location specific weather data.

* `createScale`
* `findCentreFreqIndex`
* `createEqTempMusicalScale`

If you're using [Require.JS](http://requirejs.org/) you will need to download [momentjs](https://momentjs.com/) and [es6-promise](https://github.com/stefanpenner/es6-promise).

## Music arrays

TBC

## Dependencies

DarkSkyJS uses
[moment.js](http://momentjs.com/) to handle date/time data and
[ES6 Promises Polyfill](https://github.com/jakearchibald/es6-promise) to handle the requests via promises

Ref: [https://www.npmjs.com/package/moment](https://www.npmjs.com/package/moment)
Ref: [https://www.npmjs.com/package/es6-promise](https://www.npmjs.com/package/es6-promise)

## Plans

In a later version it will be possible to generate musical scales that use just intonation rather than equal temperament
