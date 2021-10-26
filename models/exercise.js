const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  day: {
    type: Date,
    default: Date.now,
  },
  exercises: [
    {
      type: {
        type: String,
        required: "Select an exercise type"
      },
      name: {
        type: String,
        required: "Enter a name"
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
    }
  ]
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
