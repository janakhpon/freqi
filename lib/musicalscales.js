'use strict';

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.returnExports = factory();
  }
}(this, function () {

    /* 	By Richard Bultitude
    	github.com/rjbultitude
    */

    // Utility fns
    function arrayInsertAt(destArray, pos, arrayToInsert) {
      var _args = [];
      _args.push(pos);                           // where to insert
      _args.push(0);                             // nothing to remove
      _args = _args.concat(arrayToInsert);        // add on array to insert
      destArray.splice.apply(destArray, _args);  // splice it in
      return destArray;
    }

     var CHROMATIC_SCALE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

     var defaults = {
       startFreq: 440,
       numOctaves: 2,
       numSemitones: 12,
       downFirst: true
     };
     
     function sanityCheckData(data) {
         if (typeof data.downFirst !== 'boolean') {
            throw new Error('downFirst must be a boolean');
         }
         for (var prop in data) {
             if (data.hasOwnProperty(prop) && prop !== 'downFirst') {
                if (data[prop] < 0) {
                    throw new SyntaxError(prop + ' must be a positive number');
                }
                if (typeof data[prop] !== 'number') {
                    throw new TypeError(prop + ' must be a number');
                }
             }
         }
     }

     function getNoteLetters(numSemisPerOctave, startLetter, scale) {
        var _rootNoteLetters = [];
        if (numSemisPerOctave !== 12) {
          console.log('Cannot report letter due to non western scale');
        } else {
          //TODO
          console.log('CHROMATIC_SCALE', CHROMATIC_SCALE);
        }
        return _rootNoteLetters;
      }

     /**
     * [createScale Create a musical scale starting at a given frequency and counting up or down]
     * @param  {[Number]} startFreq     [A frequency or number to start at]
     * @param  {[Number]} numTones      [the number of tones (or semitone) in an octave ]
     * @param  {[Boolean]} includeOctave [a Boolean which determines whether an closing note is applied or not ]
     * @return {[Array]}               [an array containing all the frequencies in the scale]
     */
     function createScale(config) {
       var _scale = [];
       var _freqHigh;
       var _freqLow;
       var _toneLoopLength = config.numSemitones;
       if (config.includeOctave) {
         _toneLoopLength = config.numSemitones + 1;
       }
       if (config.upwardsScale) {
         for (var i = 1; i < _toneLoopLength; i++) {
           // formula for equal temperament
           _freqHigh = config.startFreq * Math.pow(2, i/config.numSemitones);
           _scale.push(_freqHigh);
         }
       } else {
         for (var j = _toneLoopLength; j > 0; j--) {
           // formula for equal temperament
           _freqLow = config.startFreq / Math.abs(Math.pow(2, j/config.numSemitones));
           _scale.push(_freqLow);
         }
       }
       return _scale;
     }

     /**
      * [findCentreFreqIndex finds the index in an array of notes or tones based on the number of octaves and semitones]
      * essentially it finds the median
      * @param  {[object]} config       [must contain number of octaves in the scale]
      * @return {[Number]}              [the index representing the start frequency]
      */
     function findCentreFreqIndex(config) {
       //numOctaves, numSemitones, downFirst
       var _totalNotes = config.numOctaves * config.numSemitones;
       var _noteIndex = null;
       //odd
       if(config.numOctaves % 2 === 1) {
         //If we went down first
         if (config.downFirst) {
           _noteIndex = config.numSemitones * ((config.numOctaves + 1) / 2);
         }
         //If we went up first
         else {
           _noteIndex = config.numSemitones * ((config.numOctaves - 1) / 2);
         }
         return _noteIndex;
       }
       //even
       else {
         _noteIndex = _totalNotes / 2;
         return _noteIndex;
       }
     }

     /**
      * [createJustMusicalExpScale creates an equal temperament musical scale of any length]
      * @param  {[Number]} startFreq    [a number representing the frequency or pitch]
      * @param  {[Number]} numOctaves   [the number of octaves to create]
      * @param  {[Number]} numSemitones [the number of semitones per octave]
      * @return {[Array]}              [an array of frequencies or pitches]
      */
     function createEqTempMusicalScale(masterConfig) {
       if (!masterConfig) {
         console.error('No masterConfig object supplied, using defaults', defaults);
         masterConfig = defaults;
       }
       try {
           sanityCheckData(masterConfig);
       } catch (e) {
           console.error(e, 'Ensure the values of your config are correct');
           return false;
       }
       var _scale = [];
       var _centreFreqIndex = findCentreFreqIndex(masterConfig);
       var _posCount = masterConfig.startFreq;
       var _negCount = masterConfig.startFreq;
       var _modRemainder = 1;
       if (masterConfig.downFirst) {
         _modRemainder = 0;
       } else {
         _modRemainder = 1;
       }
       for (var i = 0; i < masterConfig.numOctaves; i++) {
         //Create downwards _scale
         if (i % 2 === _modRemainder) {
           //always insert the smallest freqs at the start
           _scale = arrayInsertAt(_scale, 0, createScale({
             startFreq: _negCount,
             numSemitones: masterConfig.numSemitones,
             includeOctave: false,
             upwardsScale: false
           }));
           _negCount = _negCount / 2;
         } else {
           //Create upwards _scale
           _scale = _scale.concat(createScale({
             startFreq: _posCount,
             numSemitones: masterConfig.numSemitones,
             includeOctave: true,
             upwardsScale: true
           }));
           _posCount *= 2;
         }
       }
       //Add centre frequency
       _scale.splice(_centreFreqIndex, 0, masterConfig.startFreq);
       return {
         scale : _scale,
         centreFreqIndex : _centreFreqIndex
       };
     }

     return createEqTempMusicalScale;
}));
