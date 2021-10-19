const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "Enter a name for transaction"
  },
  type: {
    type: String,
    required: "Please select an exercise type"
  },
  weight: {
    type: Number,
  },
  sets: {
    type: Number,
  },
  reps: {
    type: Number,
  },
  duration: {
    type: Number,
  }, 
  distance: {
    type: Number,
  }
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
