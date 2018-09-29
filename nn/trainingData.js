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
    constructor(metadata, window) {

    }
}