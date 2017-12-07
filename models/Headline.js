//Require mongoose so writing a schema makes any sense
const mongoose = require("mongoose");

//for convenience
const Schema = mongoose.Schema;

//define the schema
const headlineSchema = new Schema({
  //The article headline
  headline: {
    type: String,
    required: true,
    //Unique prevents us from infinitely adding onto the collection of articles by checking to see if it exists already.
    unique: true
  },
  //The article summary.
  summary: {
    type: String,
    required: true
  },
  //Link to the article
  url: {
    type: String,
    required: true
  },
  //Date we create and tack onto this so we can sort by new.
  date: String,
  //Whether the user has chosen to save the article
  saved: {
    type: Boolean,
    default: false
  }
});

//Prepare the schema for export
const Headline = mongoose.model("Headline", headlineSchema);
module.exports = Headline;
