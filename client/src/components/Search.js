import React from 'react';
import PageNavbar from './PageNavbar';
import SearchRow from './SearchRow';
import '../style/BestMovies.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Search extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedIngre: "",
      selectedAuthor: "",
      selectedCookTime: "",
      recipes: []
		};

		this.submitFilters = this.submitFilters.bind(this);
		this.handleIngreChange = this.handleIngreChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
	};


	handleIngreChange(e) {
		this.setState({
      selectedIngre: e.target.value
    });
	};

  handleAuthorChange(e) {
		this.setState({
      selectedAuthor: e.target.value
    });
	};

  handleTimeChange(e) {
		this.setState({
      selectedCookTime: e.target.value
    });
	};


	submitFilters() {
    fetch("http://localhost:8081/search/"+this.state.selectedIngre + '/' + this.state.selectedAuthor + '/' + this.state.selectedCookTime,
    {
      method: 'GET'
    }).then(res => {
      return res.json();
    }, err => {
      console.log(err);
    }).then(recipesList => {
      if (!recipesList) return;
      const recipeDivs = recipesList.map((recipeObj, i) =>
        <SearchRow 
          name={recipeObj.Recipe_name} 
          img={recipeObj.Recipe_photo} 
          rating={recipeObj.Rate} 
          author={recipeObj.Author}
          totalcooktime={recipeObj.Total_time}
        /> 
      );

      this.setState({
        recipes: recipeDivs
      });
    }, err => {
      console.log(err);
    });
	};

	render() {
		return (
			<div className="Search">	
				<PageNavbar active="bestgenres" />
				<div className="search">
					<div className="jumbotron">
						<div className="h5">Customized Filter</div>
            <p id="filtering">Create your customized filters!</p>

            <div className="filters">
							<input type='text' placeholder="Ingredient " value={this.state.selectedIngre} onChange={this.handleIngreChange}/>
              <input type='text' placeholder="Author " value={this.state.selectedAuthor} onChange={this.handleAuthorChange}/>
              <input type="text" pattern="[0-9]*" placeholder="Cooktime in minutes " value={this.state.selectedCookTime} onChange={this.handleTimeChange}/>
							<button id="submitMovieBtn" className="submit-btn" onClick={this.submitFilters}>Find your recipe!</button>
						</div>
					</div>


					

			  </div>
			</div>
		);
	};
};
