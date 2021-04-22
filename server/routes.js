const config = require('./db-config.js');
const mysql = require('mysql');

config.connectionLimit = 10;
const connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */


/* ---- Q1a (Dashboard) ---- */
// Equivalent to: function getTop20Keywords(req, res) {}
const getTop20Keywords = (req, res) => {
  var query = `
    WITH kwds AS (SELECT kwd_name, COUNT(movie_id)
    FROM movie_keyword
    GROUP BY kwd_name
    ORDER BY COUNT(movie_id) DESC
    LIMIT 20)
    SELECT kwd_name 
    FROM kwds;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows)
      res.json(rows);
    }
  });
};


/* ---- Q1b (Dashboard) ---- */
const getTopMoviesWithKeyword = (req, res) => {
  var inputKeyword = req.params.keyword;
  var query = `
    WITH movs AS (
      SELECT DISTINCT movie_id
      FROM movie_keyword
      WHERE kwd_name='${inputKeyword}'
    ) 
    SELECT m.title, m.rating, m.num_ratings
    FROM movs JOIN movie m ON movs.movie_id = m.movie_id
    ORDER BY rating DESC, num_ratings DESC
    LIMIT 10;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      // console.log(rows)
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
  SELECT DISTINCT (FLOOR(release_year / 10) * 10) AS release_year
  FROM movie
  ORDER BY release_year ASC;
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
    SELECT name
    FROM genre
    WHERE name <> 'genres'
    ORDER BY name ASC;
  `;

  connection.query(query, (err, rows, fields) => {
    if (err) console.log(err);
    else res.json(rows);
  });
};


/* ---- Q3b (Best Movies) ---- */
const bestMoviesPerDecadeGenre = (req, res) => {
  var inputDecade = req.params.decade;
  var inputGenre = req.params.genre;
  var query = `
  WITH avg AS 
  (SELECT genre_name, AVG(rating) AS avgRating
  FROM movie_genre mg JOIN movie m ON mg.movie_id=m.movie_id
  WHERE FLOOR(release_year / 10) * 10 = '${inputDecade}'
  GROUP BY genre_name),
  movs AS 
  (SELECT m.movie_id, m.title, AVG(m.rating) AS rating
  FROM movie m JOIN movie_genre mg ON m.movie_id=mg.movie_id
  WHERE FLOOR(release_year / 10) * 10 = '${inputDecade}' AND mg.genre_name = '${inputGenre}'
  GROUP BY m.movie_id, title),
  compare AS
  (SELECT mv.movie_id, mg.genre_name, mv.title, mv.rating, avgRating
  FROM movs mv JOIN movie_genre mg ON mv.movie_id = mg.movie_id JOIN avg a ON a.genre_name = mg.genre_name)
  SELECT DISTINCT movie_id, title, rating 
  FROM compare 
  GROUP BY title, movie_id
  HAVING rating > MAX(avgRating)
  ORDER BY title ASC
  LIMIT 100;
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
	getTop20Keywords: getTop20Keywords,
	getTopMoviesWithKeyword: getTopMoviesWithKeyword,
	getRecs: getRecs,
  getDecades: getDecades,
  getGenres: getGenres,
  bestMoviesPerDecadeGenre: bestMoviesPerDecadeGenre
};