import React from 'react';
import PageNavbar from './PageNavbar';
import BestRecipesRow from './BestRecipesRow';
import '../style/BestMovies.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Search extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedDecade: "",
			selectedGenre: "Action",
			decades: [],
			genres: [],
			movies: []
		};

		this.submitDecadeGenre = this.submitDecadeGenre.bind(this);
		this.handleDecadeChange = this.handleDecadeChange.bind(this);
		this.handleGenreChange = this.handleGenreChange.bind(this);
	};

	/* ---- Q3a (Best Movies) ---- */
	componentDidMount() {
		// Send an HTTP request to the server.
    fetch("http://localhost:8081/decades",
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
      // Convert the response data to a JSON.
      return res.json();
    }, err => {
      // Print the error if there is one.
      console.log(err);
    }).then(decadesList => {
      if (!decadesList) return;
      const decadeDivs = decadesList.map((decadeObj, i) =>
      <option className="decadesOption" value={decadeObj.release_year}>{decadeObj.release_year}</option>
      );
      // Set the state of the keywords list to the value returned by the HTTP response from the server.
      this.setState({
        decades: decadeDivs
      });
    }, err => {
      // Print the error if there is one.
      console.log(err);
    });
    fetch("http://localhost:8081/genres",
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
      // Convert the response data to a JSON.
      return res.json();
    }, err => {
      // Print the error if there is one.
      console.log(err);
    }).then(genresList => {
      if (!genresList) return;

      // Map each movie in this.state.keywords to an HTML element:
      // A button which triggers the showMovies function for each keyword.
      const genreDivs = genresList.map((genreObj, i) =>
      <option className="genresOption" value={genreObj.name}>{genreObj.name}</option>);

      // Set the state of the keywords list to the value returned by the HTTP response from the server.
      this.setState({
        genres: genreDivs
      });
    }, err => {
      // Print the error if there is one.
      console.log(err);
    });
	};

	/* ---- Q3a (Best Movies) ---- */
	handleDecadeChange(e) {
		this.setState({
      selectedDecade: e.target.value
    });
	};

	handleGenreChange(e) {
		this.setState({
			selectedGenre: e.target.value
		});
	};

	/* ---- Q3b (Best Movies) ---- */
	submitDecadeGenre() {
    fetch("http://localhost:8081/bestMovies/"+this.state.selectedDecade+'/'+this.state.selectedGenre,
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
      // Convert the response data to a JSON.
      return res.json();
    }, err => {
      // Print the error if there is one.
      console.log(err);
    }).then(moviesList => {
      if (!moviesList) return;

      // Map each keyword in this.state.keywords to an HTML element:
      // A button which triggers the showMovies function for each keyword.
      const bestMoviesDivs = moviesList.map((movieObj, i) =>
        <BestRecipesRow 
          title={movieObj.title} 
          id={movieObj.movie_id} 
          rating={movieObj.rating} 
        /> 
      );

      // Set the state of the keywords list to the value returned by the HTTP response from the server.
      this.setState({
        movies: bestMoviesDivs
      });
    }, err => {
      // Print the error if there is one.
      console.log(err);
    });
	};

	render() {
		return (
			<div className="BestMovies">
				
				<PageNavbar active="bestgenres" />

				<div className="container bestmovies-container">
					<div className="jumbotron">
						<div className="h5">Best Movies</div>
						<div className="dropdown-container">
							<select value={this.state.selectedDecade} onChange={this.handleDecadeChange} className="dropdown" id="decadesDropdown">
                {this.state.decades}
							</select>
							<select value={this.state.selectedGenre} onChange={this.handleGenreChange} className="dropdown" id="genresDropdown">
								{this.state.genres}
							</select>
							<button className="submit-btn" id="submitBtn" onClick={this.submitDecadeGenre}>Submit</button>
						</div>
					</div>
					<div className="jumbotron">
						<div className="movies-container">
							<div className="movie">
			          <div className="header"><strong>Title</strong></div>
			          <div className="header"><strong>Movie ID</strong></div>
								<div className="header"><strong>Rating</strong></div>
			        </div>
			        <div className="movies-container" id="results">
			          {this.state.movies}
			        </div>
			      </div>
			    </div>
			  </div>
			</div>
		);
	};
};
