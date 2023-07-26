const express = require("express");
const router = express.Router();
const Movie = require("../Movie");

//READ - display a list of movies
router.get("/", (req, res) => {
  let result = "";
  retrieveAll();

  async function retrieveAll() {
    try {
      result = await Movie.find({});

      res.status(200).render("display.pug", { movies: result });
      //The results are displayed by rendering a pug file.
    } catch (error) {
      console.log(error.message);
    }
  }
});

//READ - Display details about a single movie
router.get("/:name", (req, res) => {
  let result = "";
  const name = req.params.name;
  retrieveOne();

  async function retrieveOne() {
    try {
      result = [await Movie.findOne({ name: name })];
      //the singular result is placed in an array, because display.pug expects an array
      res.status(200).render("display.pug", { movies: result });
    } catch (error) {
      console.log(error.message);
    }
  }
});

module.exports = router;
