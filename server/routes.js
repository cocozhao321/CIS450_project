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
    SELECT rev.RecipeID, Recipe_name AS RecipeName
    FROM reviews rev JOIN recipes rec ON rev.RecipeID = rec.RecipeID
    WHERE Avg_Rate >= 4.5
    ORDER BY Avg_Rate
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
    SELECT rev.RecipeID, Recipe_name AS RecipeName, Review_count AS ReviewCount
    FROM recipes rec JOIN reviews rev ON rec.RecipeID = rev.RecipeID
    ORDER BY Review_count DESC
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

const getTopAuthors = (req, res) => {
  var query = `
    WITH highlyRated AS
    (SELECT rev.RecipeID, auth.Author
    FROM reviews rev JOIN recipe_author auth ON rev.RecipeID = auth.RecipeID
    WHERE Avg_Rate >= 4.5)
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


const getTopTimeRatioRecipes = (req, res) => {
  var query = `
    WITH withRating AS
    (SELECT rec.RecipeID, Recipe_name, Avg_Rate
    FROM recipes rec JOIN reviews rev ON rec.RecipeID = rev.RecipeID)

    SELECT withRating.RecipeID, Recipe_name AS RecipeName, ROUND(Avg_Rate/Total_time, 2) AS Rating_time_ratio
    FROM withRating JOIN logistics ON withRating.RecipeID = logistics.RecipeID 
    ORDER BY Rating_time_ratio DESC
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

const getTopOvenRecipes = (req, res) => {
  var query = `
    WITH temp AS 
    ( SELECT wRating.RecipeID, Recipe_name AS RecipeName, ROUND(Avg_Rate/Total_time, 2) AS Rating_time_ratio, Directions
      FROM (SELECT rec.RecipeID, Recipe_name, Avg_Rate
      FROM recipes rec JOIN reviews rev ON rec.RecipeID = rev.RecipeID) wRating JOIN logistics ON wRating.RecipeID = logistics.RecipeID
      WHERE Directions LIKE '%oven%'
      ORDER BY Rating_time_ratio DESC
      LIMIT 10
    )
    SELECT t.RecipeID, RecipeName
    FROM temp t;
  `;

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
  getTopTimeRatioRecipes: getTopTimeRatioRecipes,
  getTopOvenRecipes: getTopOvenRecipes,

  getDecades: getDecades,
  getGenres: getGenres,
  bestMoviesPerDecadeGenre: bestMoviesPerDecadeGenre,
  calories: calories
};