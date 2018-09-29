const Song = require("./music/Song");
const getInputOutputs = require("./nn/trainingData");

//Load song into MIDI.


//Load MIDI into parsable metadata/note windows.
const song = new Song();

//Get the set of training data
const traningData = getInputOutputs(song);

//Train the NN.


//Write trained NN to output file.