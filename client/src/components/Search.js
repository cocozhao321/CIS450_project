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
    fetch("http://localhost:8081/search/" +this.state.selectedIngre + '/' + this.state.selectedAuthor + '/' + this.state.selectedCookTime,
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
          recipeID = {recipeObj.RecipeID} 
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
      <div className="background" >
			<div className="Search">	
				<PageNavbar active="search" />
        
				<div className="search">
          <br></br>
						<h3>Customized Filter</h3>
            <br></br>
            <p class="filtering">(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ Results will rank in rating order from high to low ｡◕ ‿ ◕｡</p>
            <div className="filters">
              <input type='text' placeholder="Author " value={this.state.selectedAuthor} onChange={this.handleAuthorChange}/>
              <input type='text' placeholder="Ingredient " value={this.state.selectedIngre} onChange={this.handleIngreChange}/>
							<input type="text" pattern="[0-9]*" placeholder="Cooktime in minutes " value={this.state.selectedCookTime} onChange={this.handleTimeChange}/>
              <button id="submitMovieBtn" className="submit-btn" onClick={this.submitFilters}>Find your recipe!</button>
						</div>
            <br></br>
            <br></br>
            {this.state.recipes.length > 0 ? <div class="gridcontainer">{this.state.recipes}</div> : "Sorry, no matching results o(╥﹏╥)o"}
        </div>
			</div>
      </div>
		);
	};
};
