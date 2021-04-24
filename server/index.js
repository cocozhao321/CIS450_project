const bodyParser = require('body-parser');
const express = require('express');
var routes = require("./routes.js");
const cors = require('cors');

const app = express();

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/* ---------------------------------------------------------------- */
/* ------------------- Route handler registration ----------------- */
/* ---------------------------------------------------------------- */

/* ---- (HOME) ---- */
// Top 10 Rated Recipes
app.get('/topRecipes', routes.getTopRecipes);

// Top 20 Recipes with Most Reviews
app.get('/topReviews', routes.getTopReviews); 

// Top 10 Authors with Most Recipes
app.get('/topAuthors', routes.getTopAuthors);



/* ---- Q2 (Recommendations) ---- */
app.get('/recs/:movie', routes.getRecs);


/* ---- (Best Movies) ---- */
app.get('/decades', routes.getDecades);
app.get('/genres', routes.getGenres);


/* ---- Q3b (Best Movies) ---- */
app.get('/bestMovies/:decade/:genre', routes.bestMoviesPerDecadeGenre);


app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});