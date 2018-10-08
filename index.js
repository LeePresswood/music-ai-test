const Perceptron = require("synaptic").Architect.Perceptron;
const MidiConvert = require("midiconvert");
const Song = require("./music/Song");
const INPUT_SIZE = require("./nn/trainingData").INPUT_SIZE;
const OUTPUT_SIZE = require("./nn/trainingData").OUTPUT_SIZE;
const getInputOutputs = require("./nn/trainingData").getInputOutputs;

//Load song into MIDI.
MidiConvert.load("./assets/beethoven_opus10_1.mid")
    .then((midiFile) => {

    });

//Load MIDI into parsable metadata/note windows.
const song = new Song();

//Get the set of training data
const traningData = getInputOutputs(song);

//Train the NN.
const nn = new Perceptron(INPUT_SIZE, 100, 100, 100, OUTPUT_SIZE);

//Write trained NN to output file.