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
                header: { PPQ: 480, timeSignature: [ 3, 4 ], bpm: 183.31973711949698 },
                tracks: [
                    {
                        name: 'Klaviersonate No. 5 -  1. Satz',
                        channelNumber: 0,
                        notes: [Array],
                        controlChanges: [Object],
                        instrumentNumber: 0,
                        id: 0
                    },
                    ...
                ]
            }
        */
        const header = data.header;
        const track = data.tracks[0]; //Only want the first track for now. May support multiple tracks in the future.

        this.metadata = new Metadata(header.timeSignature, header.PPQ, header.bpm);
        this.track = new Track(track.instrumentNumber, track.notes);
    }
};

class Metadata {
    constructor([timeSignatureNumerator, timeSignatureDenominator], ppq, bpm) {
        //Time signature numerator and denominator. Normalized out of 20.
        this.timeSignatureNumerator = normalizeBy(timeSignatureNumerator, 20);
        this.timeSignatureDenominator = normalizeBy(timeSignatureDenominator, 20);

        //PPQ -- Pulses per quarter-note. Generally much lower than 1000. Normalized out of 1000.
        this.ppq = normalizeBy(ppq, 1000);

        //BPM -- Beats per minute. Normalized out of 1000.
        this.bpm = normalizeBy(bpm, 1000);
    }
}

class Track {
    constructor(instrument, notes) {
        //Instrument -- 128 total in General MIDI. Normalized out of 128.
        this.instrument = normalizeBy(instrument, 128);

        /*
            "notes" looks something like this:
            [
                {
                    midi: 75,
                    time: 12.437286000000007,
                    duration: 0.6545940000000012,
                    velocity: 0.5748031496062992
                },
                ...
            ]
        */
        console.log(notes);
        this.windows = [];
    }
}

class Window {
    constructor() {

    }
}

function normalizeBy(val, denom) {
    return Math.min(val, denom) / denom;
}