import React from 'react';
import PageNavbar from './PageNavbar';
import CartRow from './CartRow';
import '../style/Account.css';
import "bootstrap/dist/css/bootstrap.css";
import "./assets/scss/paper-dashboard.scss?v=1.2.0";
import "./assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";


const selectedRecipes = [];

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };
  };


  // React function that is called when the page load.
  componentDidMount() {    
    // Send an HTTP request to the server.
    fetch("http://localhost:8081/Account",
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
      // Convert the response data to a JSON.
      return res.json();
    }, err => {
      console.log(err);
    }).then(recipesList => {
      if (!recipesList) return;
      const recipeDivs = recipesList.map((recipeObj, i) =>
        <CartRow 
          name={recipeObj.Recipe_name} 
          img={recipeObj.Recipe_photo} 
          rating={recipeObj.Rate} 
          author={recipeObj.Author}
          totalcooktime={recipeObj.Ingredients}
        /> 
      );

      this.setState({
        recipes: recipeDivs
      });

    }, err => {
      // Print the error if there is one.
      console.log(err);
    });
  };

  render() {    
    return (
      <div className="background" >
      <div className="Search">  
      <PageNavbar active="account" />
      <div className="search">
          <br></br>
            <div className="h1"><center>Your favourite Recipes</center></div>
            <br></br>
            <div className="gridcontainer">

              {this.state.recipes}
              <br></br>
            </div>
      </div>
      </div>
      </div>

    );
  };
};