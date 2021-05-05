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

// Top 10 Recipes with Most Reviews
app.get('/topReviews', routes.getTopReviews); 

// Top 10 Authors with Most Recipes
app.get('/topAuthors', routes.getTopAuthors);

// Top 10 Recipes with Best Rating-to-Time Ratio
app.get('/topTimeRatioRecipes', routes.getTopTimeRatioRecipes);

// Top 10 Best Rating-to-Time Recipes that Use an Oven
app.get('/topOvenRecipes', routes.getTopOvenRecipes);

app.get('/calories/:term/', routes.calories);

app.get('/search/:ingredient/:author/:cooktime/', routes.filterRecipes);


app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});