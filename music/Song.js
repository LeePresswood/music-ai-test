//TODO: Get the length of the song.
const length = 6 * 60 + 32;

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
        //We need to find a way to look at notes in relation to the notes immediately before and after the current note.
        //My idea here is to use a sliding window of the 5 notes before and after the current note.
        //This window will be inclusive of blank values (such as the very beginning or ending of a song).
        //That is to say that we'll have the same number of windows as we have notes.
        const lookbackIndices = notes
            .map((current, index) => rangeBehind(index, 5)); //TODO: Find the optimal lookback.

        const normalizedNotes = notes
            .map(this.normalizeNote);

        //We end up with an array of normalized note arrays. Each array represents the previous 5 notes behind the next note.
        const windows = lookbackIndices
            .map((range) => range.map((i) => normalizedNotes[i]));

        //We want the final result to be an array of training sets. We want the lookback data of the previous 5 notes
        //and the resulting note that we expect the NN to return.
        this.trainingSets = normalizedNotes
            .map((current, index) => ({
                lookback: windows[index] || {
                    midi: -1,
                    time: -1,
                    duration: -1,
                    velocity: -1
                },
                result: current
            }));
    }

    normalizeNote(note) {
        let normalizedNote = {};

        //midi -- The note. Normalize by 128.
        normalizedNote['midi'] = normalizeBy(note.midi, 128);

        //time -- The point in the song at which the note is played. Normalize by the length of the song.
        normalizedNote['time'] = normalizeBy(note.time, length);

        //duration -- How long the note is held. Normalize by 100.
        normalizedNote['duration'] = normalizeBy(note.duration, 100);

        //velocity -- The forcefulness or loudness of the note. Normalize by 128.
        normalizedNote['velocity'] = normalizeBy(note.velocity, 128);


        return normalizedNote;
    }
}

function normalizeBy(val, denom) {
    return Math.min(val, denom) / denom;
}

function rangeBehind(index, lookback) {
    let range = [];
    for (let i = index - lookback; i < index; i++) {
        range.push(i);
    }

    return range;
}