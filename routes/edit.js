const express = require("express");
const router = express.Router();
const Movie = require("../Movie");

//This file contains all routes that make changes to the database, i.e., Create, Update and Delete

//CREATE - add a movie
router.post("/add", (req, res) => {
  let movie_list = req.body.movie_list;
  insert();

  async function insert() {
    try {
      for (let i = 0; i < movie_list.length; i++) {
        let movie_info = movie_list[i];
        await Movie.create({
          name: movie_info["name"],
          img: movie_info["img"],
          summary: movie_info["summary"],
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  //The ternary operator is used below to use the singular form of the word 'movie' if one movie was added, or the plural form if more than one were added
  return res
    .status(200)
    .send(
      `${movie_list.length} ${
        movie_list.length > 1 ? "movies" : "movie"
      } successfully added.`
    );
});

//UPDATE - Change details of movie
router.put("/change", (req, res) => {
  let movie = req.body;

  updateMovie();

  async function updateMovie() {
    try {
      //if both, image and summary, are provided in the body then both need to be updated
      if (movie.img && movie.summary) {
        await Movie.findOneAndUpdate(
          { name: movie.name },
          { img: movie.img, summary: movie.summary }
        );

        // if only image is provided, then only that needs to be updated
      } else if (movie.img) {
        await Movie.findOneAndUpdate({ name: movie.name }, { img: movie.img });

        //if only summary is provided, then only that needs to be updated
      } else if (movie.summary) {
        await Movie.findOneAndUpdate(
          { name: movie.name },
          { summary: movie.summary }
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return res.status(200).send("Movie successfully updated");
});

//DELETE - delete a movie
router.delete("/delete/:name", (req, res) => {
  const name = req.params.name;
  deleteOne();

  async function deleteOne() {
    try {
      await Movie.deleteOne({ name: name });
    } catch (error) {
      console.log(error.message);
    }
  }
  return res.send("Movie successfully deleted");
});

module.exports = router;
