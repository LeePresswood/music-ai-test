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
        this.metadata = new Metadata(4, 4);
        this.windows = [];
    }
};

class Metadata {
    constructor(timeSignatureNumerator, timeSignatureDenominator) {
        this.timeSignatureNumerator = timeSignatureNumerator;
        this.timeSignatureDenominator = timeSignatureDenominator;
    }
}

class Window {
    constructor() {

    }
}