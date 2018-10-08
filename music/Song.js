module.exports = class Song {
    /**
     * List of inputs spread across an array.
     *
     * Normalize the inputs to be between 0 and 1.
     * Use - 1 for null, undefined, unknown, or don 't care.
     *
     * @param {object} data MIDI data for the entire song.
     */
    constructor(data) {
        /*
        "data" looks something like this:
        {
          header:
           { PPQ: 480, timeSignature: [ 3, 4 ], bpm: 183.31973711949698 },
          tracks:
           [ t {
               name: 'Klaviersonate No. 5 -  1. Satz',
               channelNumber: 0,
               notes: [Array],
               controlChanges: [Object],
               instrumentNumber: 0,
               id: 0 } ] }
        */
        const header = data.header;
        const tracks = data.tracks;
        this.metadata = new Metadata(header.PPQ, header.timeSignature, header.bpm);
        this.windows = [];
    }
};

class Metadata {
    constructor(ppq, [timeSignatureNumerator, timeSignatureDenominator], bpm) {
        //PPQ -- Pulses per quarter-note. Generally much lower than 1000. Normalized out of 1000.
        this.ppq = Math.min(ppq, 1000) / 1000;

        //Time signature numerator and denominator. Normalized out of 20.
        this.timeSignatureNumerator = Math.min(timeSignatureNumerator, 20) / 20
        this.timeSignatureDenominator = Math.min(timeSignatureDenominator, 20) / 20;

        //BPM -- Beats per minute. Normalized out of 1000.
        this.bpm = Math.min(bpm, 1000) / 1000;
    }
}

class Window {
    constructor() {

    }
}