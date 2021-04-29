import React from 'react';
import '../style/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import DashboardMovieRow from './DashboardMovieRow';
import HomeReviewsList from './HomeReviewsList';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component. This component maintains the list of keywords,
    // and a list of movies for a specified keyword.
    this.state = {
      topRecipeResults: [],
      topReviewResults: [],
      topAuthorResults: [],
      topRatioResults: [],
      topOvenResults: []
    };

  };

  // React function that is called when the page load.
  componentDidMount() {
    // Send an HTTP request to the server.
    fetch("http://localhost:8081/topRecipes",
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
      // Convert the response data to a JSON.
      return res.json();
    }, err => {
      // Print the error if there is one.
      console.log(err);
    }).then(recipeList => {
      if (!recipeList) return;

      // Map each keyword in this.state.keywords to an HTML element:
      // A button which triggers the showMovies function for each keyword.
      const r = recipeList.map((recObj, i) =>
        <DashboardMovieRow 
          RecipeID={recObj.RecipeID}
          RecipeName={recObj.RecipeName} 
        />
      );

      // Set the state of the keywords list to the value returned by the HTTP response from the server.
      this.setState({
        topRecipeResults: r
      });
    }, err => {
      // Print the error if there is one.
      console.log(err);
    });


    fetch("http://localhost:8081/topReviews",
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
      // Convert the response data to a JSON.
      return res.json();
    }, err => {
      // Print the error if there is one.
      console.log(err);
    }).then(recipeList => {
      if (!recipeList) return;

      const r = recipeList.map((recObj, i) =>
        <HomeReviewsList 
          RecipeID={recObj.RecipeID}
          RecipeName={recObj.RecipeName} 
          ReviewCount={recObj.ReviewCount}
        />
      );

      // Set the state of the keywords list to the value returned by the HTTP response from the server.
      this.setState({
        topReviewResults: r
      });
    }, err => {
      // Print the error if there is one.
      console.log(err);
    });


    fetch("http://localhost:8081/topAuthors",
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
      // Convert the response data to a JSON.
      return res.json();
    }, err => {
      // Print the error if there is one.
      console.log(err);
    }).then(authList => {
      if (!authList) return;

      const a = authList.map((authObj, i) =>
        <DashboardMovieRow 
          RecipeID={authObj.Author}
          RecipeName={authObj.rec_count} 
        />
      );

      // Set the state of the keywords list to the value returned by the HTTP response from the server.
      this.setState({
        topAuthorResults: a
      });
    }, err => {
      // Print the error if there is one.
      console.log(err);
    });

    // Send an HTTP request to the server.
    fetch("http://localhost:8081/topTimeRatioRecipes",
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
      // Convert the response data to a JSON.
      return res.json();
    }, err => {
      // Print the error if there is one.
      console.log(err);
    }).then(recipeList => {
      if (!recipeList) return;

      // Map each keyword in this.state.keywords to an HTML element:
      // A button which triggers the showMovies function for each keyword.
      const r = recipeList.map((recObj, i) =>
        <HomeReviewsList 
          RecipeID={recObj.RecipeID}
          RecipeName={recObj.RecipeName} 
          ReviewCount={recObj.Rating_time_ratio}
        />
      );

      // Set the state of the keywords list to the value returned by the HTTP response from the server.
      this.setState({
        topRatioResults: r
      });
    }, err => {
      // Print the error if there is one.
      console.log(err);
    });

    fetch("http://localhost:8081/topOvenRecipes",
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
      // Convert the response data to a JSON.
      return res.json();
    }, err => {
      // Print the error if there is one.
      console.log(err);
    }).then(recipeList => {
      if (!recipeList) return;

      const a = recipeList.map((recObj, i) =>
        <DashboardMovieRow 
          RecipeID={recObj.RecipeID}
          RecipeName={recObj.RecipeName} 
        />
      );

      // Set the state of the keywords list to the value returned by the HTTP response from the server.
      this.setState({
        topOvenResults: a
      });
    }, err => {
      // Print the error if there is one.
      console.log(err);
    });

  };


  render() {    

    return (
      <div className="Dashboard">

        <PageNavbar active="dashboard" />

        <div className="container movies-container">
          <div className="jumbotron">
            <div className="h5">Top 10 Rated Recipes</div>
              <div className="movies-container">
              <div className="movies-header">
                <div className="header"><strong>RecipeID</strong></div>
                <div className="header-lg"><strong>Name</strong></div>
              </div>
              <div className="results-container" id="results">
                {this.state.topRecipeResults}
              </div>
            </div>
          </div>
        </div>

        <br />

        <div className="container movies-container">
          <div className="jumbotron">
            <div className="h5">Top 10 Recipes with Most Reviews</div>
              <div className="movies-container">
              <div className="movies-header">
                <div className="header"><strong>RecipeID</strong></div>
                <div className="header-lg"><strong>Name</strong></div>
                <div className="header"><strong>Reviews Count</strong></div>
              </div>
              <div className="results-container" id="results">
                {this.state.topReviewResults}
              </div>
            </div>
          </div>
        </div>


        <br />

        <div className="container movies-container">
          <div className="jumbotron">
            <div className="h5">Top 10 Authors with Most Recipes</div>
              <div className="movies-container">
              <div className="movies-header">
                <div className="header-lg"><strong>Author</strong></div>
                <div className="header"><strong>Recipes Count</strong></div>
              </div>
              <div className="results-container" id="results">
                {this.state.topAuthorResults}
              </div>
            </div>
          </div>
        </div>

        <br />

        <div className="container movies-container">
          <div className="jumbotron">
            <div className="h5">Top 10 Recipes with Best Rating-to-Time</div>
              <div className="movies-container">
              <div className="movies-header">
                <div className="header"><strong>RecipeID</strong></div>
                <div className="header-lg"><strong>Name</strong></div>
                <div className="header"><strong>Rating-to-Time Ratio</strong></div>
              </div>
              <div className="results-container" id="results">
                {this.state.topRatioResults}
              </div>
            </div>
          </div>
        </div>

        <br />

        <div className="container movies-container">
          <div className="jumbotron">
            <div className="h5">Top 10 Recipes with Best Rating-to-Time that Use an Oven</div>
              <div className="movies-container">
              <div className="movies-header">
                <div className="header"><strong>RecipeID</strong></div>
                <div className="header-lg"><strong>Name</strong></div>
              </div>
              <div className="results-container" id="results">
                {this.state.topOvenResults}
              </div>
            </div>
          </div>
        </div>


      </div>

    );
  };
};
