const config = require('./db-config.js');
const mysql = require('mysql');

config.connectionLimit = 10;
const connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */


/* ---- Q1 (HOMEPAGE) ---- */
const getTopRecipes = (req, res) => {
  // Selects highly rated recipes.
  var query = `
    SELECT rev.RecipeID, Recipe_name AS Name
    FROM project_db.reviews rev JOIN project_db.recipes rec ON rev.RecipeID = rec.RecipeID
    WHERE Rate >= 4.5
    ORDER BY Rate
    LIMIT 10;
  `;

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows)
      res.json(rows);
    }
  });
};

const getTopReviews = (req, res) => {
  // Selects highly rated recipes.
  var query = `
    SELECT rev.RecipeID, Recipe_name AS Name, Review_count AS Review_Count
    FROM recipes rec JOIN reviews rev ON rec.RecipeID = rev.RecipeID
    ORDER BY Review_count DESC
    LIMIT 20;
  `;

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows)
      res.json(rows);
    }
  });
};

const getTopAuthors = (req, res) => {
  var query = `
    WITH highlyRated AS
    (SELECT rev.RecipeID, rec.Author
    FROM reviews rev JOIN recipes rec ON rev.RecipeID = rec.RecipeID
    WHERE Rate >= 4.5)
    SELECT Author, COUNT(RecipeID) AS rec_count
    FROM highlyRated
    GROUP BY Author
    ORDER BY COUNT(RecipeID) DESC
    LIMIT 10;
  `;

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows)
      res.json(rows);
    }
  });
};



/* ---- Q2 (Recommendations) ---- */
const getRecs = (req, res) => {
  var inputMovie = req.params.movie;
  var query = ` 
  WITH cast AS 
  (SELECT ci.cast_id
  FROM cast_in ci JOIN movie m ON m.movie_id=ci.movie_id
  WHERE m.title='${inputMovie}'),
  ourMovies AS
  (SELECT ci.movie_id, COUNT(*) AS count
  FROM cast c JOIN cast_in ci ON c.cast_id=ci.cast_id
  GROUP BY ci.movie_id)
  SELECT m.title, m.movie_id, m.rating, m.num_ratings
  FROM ourMovies om JOIN movie m on m.movie_id=om.movie_id
  WHERE m.title !='${inputMovie}'
  ORDER BY om.count DESC, rating DESC, num_ratings DESC
  LIMIT 10;
  `
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows)
      res.json(rows);
    }
  });
};


/* ---- Q3a (Best Movies) ---- */
const getDecades = (req, res) => {
  var query = `
  SELECT DISTINCT (FLOOR(Rate)) AS rateBase
  FROM reviews
  ORDER BY rateBase DESC;
  `
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows)
      res.json(rows);
    }
  });
};


/* ---- (Best Movies) ---- */
const getGenres = (req, res) => {
  const query = `
    SELECT DISTINCT ((FLOOR(Review_count/100)) * 100) AS popularBase
    FROM recipes
    ORDER BY popularBase ASC;
  `

  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};

const bestMoviesPerDecadeGenre = (req, res) => {
  var givengenre = req.params.genre;
  var givendecade = req.params.decade;

  var query = `
  SELECT Recipe_name, Rate, Review_count, Recipe_photo 
  FROM recipes reci JOIN reviews rev ON reci.RecipeID = rev.RecipeID 
  WHERE (FLOOR(Rate)) = ${givendecade} AND ((FLOOR(Review_count/100)) * 100) = ${givengenre}
  LIMIT 20;
  `
  //  ORDER BY Rate DESC
  //ORDER BY Review_count DESC
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};


/* ---- Q3b (Best Movies) ---- */
const calories = (req, res) => {
  var ingredient = req.params.term;
  var query = `
  SELECT Recipe_name, Rate, Recipe_photo
FROM recipes rp JOIN reviews rv ON rp.RecipeID = rv.RecipeID 
WHERE rp.Ingredients LIKE '%${ingredient}%'
ORDER BY Rate DESC
LIMIT 5;
  `
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows)
      res.json(rows);
    }
  });
};

module.exports = {
  getTopRecipes: getTopRecipes,
  getTopReviews: getTopReviews,
  getTopAuthors: getTopAuthors,

	getRecs: getRecs,
  getDecades: getDecades,
  getGenres: getGenres,
  bestMoviesPerDecadeGenre: bestMoviesPerDecadeGenre,
  calories: calories
};