exports.INPUT_SIZE = 10;
exports.OUTPUT_SIZE = 4;

/**
 *
 * @param {Song} song Song metadata + notes
 * @returns {InputOutput[]} training data array for the Neural Network.
 */
exports.getInputOutputs = (song) => song.windows.map(window => new InputOutput(song.metadata, window));

/**
 * List of inputs spread across an array. Inputs are normalized to be between -1 and 1.
 */
class InputOutput {
    constructor(song) {
        //We'll want an array of input arrays. Global data will be duplicated.
        //Track data will coincide with the prepared normalized note windows.
        this.inputs = song.track.trainingSets
            .map((set, index) => [
                //Global song data.
                song.metadata.timeSignatureNumerator,
                song.metadata.timeSignatureDenominator,
                song.metadata.ppq,
                song.metadata.bpm,

                //Track data.
                song.track.instrument,
                set.lookback[0].midi,
                set.lookback[0].time,
                set.lookback[0].duration,
                set.lookback[0].velocity,
                set.lookback[1].midi,
                set.lookback[1].time,
                set.lookback[1].duration,
                set.lookback[1].velocity,
                set.lookback[2].midi,
                set.lookback[2].time,
                set.lookback[2].duration,
                set.lookback[2].velocity,
                set.lookback[3].midi,
                set.lookback[3].time,
                set.lookback[3].duration,
                set.lookback[3].velocity,
                set.lookback[4].midi,
                set.lookback[4].time,
                set.lookback[4].duration,
                set.lookback[4].velocity,
            ]);
        this.outputs = song.track.trainingSets
            .map((set) => [
                set.result.midi,
                set.result.time,
                set.result.duration,
                set.result.velocity,
            ]);
    }
}