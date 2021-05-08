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
    SELECT rev.RecipeID, Recipe_name AS RecipeName, Recipe_photo
    FROM Reviews rev JOIN Recipes rec ON rev.RecipeID = rec.RecipeID
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
    FROM Recipes rec JOIN Reviews rev ON rec.RecipeID = rev.RecipeID
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
    FROM Reviews rev JOIN Recipe_author auth ON rev.RecipeID = auth.RecipeID
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
    FROM Recipes rec JOIN Reviews rev ON rec.RecipeID = rev.RecipeID)
    SELECT withRating.RecipeID, Recipe_name AS RecipeName, ROUND(Avg_Rate/Total_time, 2) AS Rating_time_ratio
    FROM withRating JOIN Directions ON withRating.RecipeID = Directions.RecipeID 
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
    SELECT wRating.RecipeID, Recipe_name AS RecipeName, ROUND(Avg_Rate/Total_time, 2) AS Rating_time_ratio, Directions
    FROM (SELECT rec.RecipeID, rec.Recipe_name, rev.Avg_Rate
      FROM Recipes rec JOIN Reviews rev ON rec.RecipeID = rev.RecipeID) wRating JOIN 
      (SELECT RecipeID, Directions, Total_time
      FROM Directions
      WHERE Directions LIKE '%oven%') dir ON wRating.RecipeID = dir.RecipeID
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

/* ---- Calories---- */
const calories = (req, res) => {
  var ingredient = req.params.term;
  var query = `
    SELECT DISTINCT Recipe_name, Avg_Rate AS Rate, Recipe_photo
    FROM Recipes rp JOIN Reviews rv ON rp.RecipeID = rv.RecipeID JOIN Ingredients ri ON ri.RecipeID = rv.RecipeID
    WHERE ri.Ingredient LIKE '%${ingredient}%'
    ORDER BY Avg_Rate DESC
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

const filterRecipes = (req, res) => {
  var givenIngre = req.params.ingredient;
  var givenAuthor = req.params.author;
  var givenCooktime = req.params.cooktime;


  var query = `
  SELECT DISTINCT r.Recipe_name, r.Recipe_photo, l.Total_time, a.Author, v.Avg_Rate AS Rate, r.RecipeID
  FROM Recipes r
  JOIN Directions l ON r.RecipeID = l.RecipeID
  JOIN Recipe_author a ON r.RecipeID = a.RecipeID
  JOIN Ingredients i ON r.RecipeID = i.RecipeID
  JOIN Reviews v ON r.RecipeID = v.RecipeID
  WHERE i.Ingredient LIKE '%${givenIngre}%'
  AND a.Author LIKE '%${givenAuthor}%'
  AND l.Total_time < ${givenCooktime}
  ORDER BY Rate DESC
  LIMIT 15;
  `

  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};

const getRecipes = (req, res) => {
  var query = `
  SELECT DISTINCT r.Recipe_name, r.Recipe_photo, group_concat(distinct ri.Ingredient) as Ingredients, a.Author, v.Avg_Rate AS Rate
  FROM Recipes r
  JOIN Recipe_author a ON r.RecipeID = a.RecipeID
  JOIN Ingredients ri ON ri.RecipeID = r.RecipeID
  JOIN Reviews v ON r.RecipeID = v.RecipeID
  JOIN User_recipes ur ON ur.RecipeID = r.RecipeID
  group by r.RecipeID;
  `
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};

const postRecipeId = (req, res) => {
  var givenID = req.params.recipeID;
  var query = `
  INSERT INTO User_recipes VALUES (123, ${givenID});
  `
  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};

module.exports = {
  getTopRecipes: getTopRecipes,
  getTopReviews: getTopReviews,
  getTopAuthors: getTopAuthors,
  getTopTimeRatioRecipes: getTopTimeRatioRecipes,
  getTopOvenRecipes: getTopOvenRecipes,

  calories: calories,
  filterRecipes: filterRecipes,

  getRecipes: getRecipes,
  postRecipeId: postRecipeId
};