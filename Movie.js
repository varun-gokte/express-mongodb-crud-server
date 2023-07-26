const mongoose = require("mongoose");

//This defines the schema used by the database to store the movies
const movieSchema = new mongoose.Schema({
  name: String,
  img: String,
  summary: String,
});

module.exports = mongoose.model("Movie", movieSchema);
