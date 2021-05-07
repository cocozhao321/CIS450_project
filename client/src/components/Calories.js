import axios from 'axios';
import React from 'react';
import BestRecipesRow from './BestRecipesRow';
import PageNavbar from './PageNavbar';
import '../style/BestMovies.css';
import './Calories.css';
// Main component
export default class Calories extends React.Component {
  state = {
    items: [],
    term: '',
    recipes: []
  };

  componentDidMount() {
    console.clear();
    let term = this.state.term;
    axios
      .get(`https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(term)}`, {
        headers: {
          "X-Api-Key": "9AWK9Jt/hdW4RBKFSPPApQ==zDIOA8e7Ci1fw8hJ"
        }
      })
      .then((response) => {
       console.log(response.data.items);
       this.setState({
          ...this.state,
          items: response.data.items
        });
       })
      .catch((error) => console.log(error.message));
    console.log(this.state.items);
    
  }
  
  fetchItems = () => {
    console.clear();
    let term = this.state.term;
    axios
      .get(`https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(term)}`, {
        headers: {
          "X-Api-Key": "9AWK9Jt/hdW4RBKFSPPApQ==zDIOA8e7Ci1fw8hJ"
        }
      })
      .then((response) => {
       console.log(response.data.items);
       this.setState({
          ...this.state,
          items: response.data.items
        });
       })
      .catch((error) => console.log(error.message));
    console.log(this.state.items);
  }
  
  getItems = () => {
    let items = [];
    this.state.items.map(item => {
      items.push(<Item 
                   name={item.name}
                   calories={item.calories}
                   carbs={item.carbohydrates_total_g}
                   serve={item.serving_size_g}
                   cholesterol={item.cholesterol_mg}
                   fat_saturated={item.fat_saturated_g}
                   fat_total={item.fat_total_g}
                   fiber={item.fiber_g}
                   potassium={item.potassium_mg}
                   protein={item.protein_g}
                   sodium={item.sodium_mg}
                   sugar={item.sugar_g}
                   />);
    });
    
    return items;
  }
  
  storeValue = (searchValue) => {
    this.setState({
      ...this.state,
      term: searchValue
    });
    this.fetchItems();
    console.log(this.state.term)
  }
  
  storeClick = () => {
    this.fetchItems();
    fetch(`http://localhost:8081/calories/${this.state.term}`,
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
      // Convert the response data to a JSON.
      return res.json();
    }, err => {
      // Print the error if there is one.
      console.log(err);
    }).then(recipesList => {
      if (!recipesList) return;

      // Map each keyword in this.state.keywords to an HTML element:
      // A button which triggers the showMovies function for each keyword.
      const recipeDivs = recipesList.map((recipeObj, i) =>
      <div class="cal_card">
        <BestRecipesRow 
          img={recipeObj.Recipe_photo}
          name={recipeObj.Recipe_name}
          rating={recipeObj.Rate} 
        /> 
        </div>
      );

      // Set the state of the keywords list to the value returned by the HTTP response from the server.
      this.setState({
        recipes: recipeDivs
      });
    }, err => {
      // Print the error if there is one.
      console.log(err);
    });
    console.log('click')
  }
  
  handleKeyDown = () => {
    
  }
  

  render() {
    let allItems = this.getItems();
    return (
      <div className="whitebk" >
      <div className="calories">
        <PageNavbar active="bestgenres" />
        <h5>Calorie Finder</h5>
        <p id="calorie_instructions">(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ Enter an ingredient below to view its nutritional content and get highly rated recipe recommendations! ｡◕ ‿ ◕｡</p>
        <Search sendValue={this.storeValue} sendEnter={this.storeClick} />
        
          { allItems.length === 0 ? <div className='error'><i class="fas fa-pizza-slice"></i></div> : <div className='items'> {allItems} </div>}
        
			          {this.state.recipes.length > 1 ? <div class="flex-container">{this.state.recipes}</div> : "No recipes seem to include this ingredient..."}
      </div>
      </div>
    );
  }
}

// Search component
class Search extends React.Component {

  // this.handleClick = this.handleClick.bind(this);
  
  handleChange = (e) => {
    this.props.sendValue(e.target.value);
  }

  keyDown = (event) => {
    if (event.key === 'Enter') {
      this.props.sendEnter();
      console.log('Enter')
    }
  }

  submit = (event) => {
      this.props.sendEnter();
  }
  
  render() {
    return (
      <div className="search">
        <div className='search-box'>
          <input type='text' onChange={this.handleChange} onKeyDown={this.keyDown} placeholder='Enter an ingredient...' />
          <button id="submitMovieBtn" className="submit-btn" onClick={this.submit}>Submit</button>
        </div>
      </div>
     )
  }
}


// Item component 
class Item extends React.Component {
  
  render() {
    return (
      <div className='item'>
        <div className='item-top'>
          <div className='item-head'>
            <h4>{this.props.name}</h4>
          </div>
            
            <div className='item-info'>
              <span className='item-info-a'>Calories: {this.props.calories}</span>
            </div>
            
            <div className='item-info'>
              <span className='item-info-a'>Serve (grams): {this.props.serve}</span>
            </div>
            
          <div className='item-row'>
            <div className='item-row-a'>Per serving: {this.props.serve}g</div>
          </div>
          
          <div className='item-row'>
            <div className='item-row-a'>Carbs: {this.props.carbs}g</div>
          </div>
          
          <div className='item-row'>
            <div className='item-row-a'>Cholesterol: {this.props.cholesterol}mg</div>
          </div>
          
          <div className='item-row'>
            <div className='item-row-a'>Saturated fats: {this.props.fat_saturated}g</div>
          </div>
          
          <div className='item-row'>
            <div className='item-row-a'>Total fats: {this.props.fat_total}g</div>
          </div>
          
          <div className='item-row'>
            <div className='item-row-a'>Fiber: {this.props.fiber}g</div>
          </div>
          
          <div className='item-row'>
            <div className='item-row-a'>Protein: {this.props.protein}g</div>
          </div>
          
          <div className='item-row'>
            <div className='item-row-a'>Potassium: {this.props.potassium}mg</div>
          </div>
          
          <div className='item-row'>
            <div className='item-row-a'>Sodium: {this.props.sodium}mg</div>
            <div className='item-row-b'></div>
          </div>
          
          <div className='item-row'>
            <div className='item-row-a'>Sugar: {this.props.sugar}g</div>

          </div>
          
        </div>
      </div>
    )
  }
}