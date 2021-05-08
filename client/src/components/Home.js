import React from 'react';
import PageNavbar from './PageNavbar';
import DashboardMovieRow from './DashboardMovieRow';
import '../style/BestMovies.css';
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


const topRecipes = [], topReviews = [], topAuthors = [], topRatio =[], topOven = [], fastestRecipes = [];

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  };


  // React function that is called when the page load.
  componentDidMount() {
    function createDataTwoElem(recipeID, value) {
      return { recipeID, value };
    }

    function createDataThreeElem(recipeID, value, value2) {
      return { recipeID, value, value2 };
    }

    
    // Send an HTTP request to the server.
    fetch("http://localhost:8081/topRecipes",
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
      // Convert the response data to a JSON.
      return res.json();
    }, err => {
      console.log(err);
    }).then(recipeList => {
      if (!recipeList) return;

      recipeList.forEach((item, i) => {
        topRecipes.push(createDataThreeElem(item.RecipeID, item.RecipeName, item.Recipe_photo));
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

      recipeList.forEach((item, i) => {
        topReviews.push(createDataThreeElem(item.RecipeID, item.RecipeName, item.ReviewCount));
      });

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

      authList.forEach((item, i) => {
        topAuthors.push(createDataTwoElem(item.Author, item.rec_count));
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

      recipeList.forEach((item, i) => {
        topRatio.push(createDataThreeElem(item.RecipeID, item.RecipeName, item.Rating_time_ratio));
      });

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
      
      recipeList.forEach((item, i) => {
        topOven.push(createDataTwoElem(item.RecipeID, item.RecipeName));
      });

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

    fetch("http://localhost:8081/fastestRecipes",
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
      
      recipeList.forEach((item, i) => {
        fastestRecipes.push(createDataThreeElem(item.RecipeID, item.RecipeName, item.Cook_time));
      });
    }, err => {
      // Print the error if there is one.
      console.log(err);
    });

  };
  
  saveRecipes(recipeID) {
    fetch("http://localhost:8081/save/" +recipeID,
    {
      method: 'POST'
    }).then(res => {
      console.log(recipeID);
      return res.json();
    }, err => {
      console.log(err);
    });
  };

  render() {    
    return (
      
      <div className="content">
        <div className="tablebk" >
        <PageNavbar active="dashboard" />
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Top 10 Rated Recipes</CardTitle>
                  <p className="card-category">
                    Recipes with an average rating at least 4.5/5
                  </p>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th className="text-left">ID</th>
                        <th>Name</th>
                        <th>Photo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(topRecipes).map((topRecipe, index) => (
                        <tr key={topRecipe.recipeID}>
                          <td component="th" scope="row">
                            {topRecipe.recipeID}
                          </td>
                          <td>{topRecipe.value}</td>
                          <td><img src={topRecipe.value2} alt="" border="3" width="150" heigth="150"></img></td> 
                          <td><button className="submit-btn" onClick={this.saveRecipes(topRecipes[index].recipeID)}>Save the recipe!</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>

        <Row>
          <table align="center">
            <tr><td>
              <Col md="12">
                  <Card>
                    <CardHeader>
                      <CardTitle tag="h4">Top 10 Recipes with Most Reviews</CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Table responsive>
                        <thead className="text-primary">
                          <tr>
                            <th className="text-left">ID</th>
                            <th>Name</th>
                            <th>Count</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(topReviews).map((topReviews) => (
                            <tr key={topReviews.recipeID}>
                              <td component="th" scope="row">
                                {topReviews.recipeID}
                              </td>
                              <td>{topReviews.value}</td>
                              <td>{topReviews.value2}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card>
                </Col>
            </td><td>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">Top 10 Authors with Most Recipes</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Table responsive>
                      <thead className="text-primary">
                        <tr>
                          <th className="text-left">Author</th>
                          <th>Count</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(topAuthors).map((topAuthors) => (
                          <tr key={topAuthors.recipeID}>
                            <td component="th" scope="row">
                              {topAuthors.recipeID}
                            </td>
                            <td>{topAuthors.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
            </td></tr>
          </table> 
        </Row>

        <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Top 5 Quickest Recipes</CardTitle>
                  <p className="card-category">
                    Recipes that take the least cook-time
                  </p>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th className="text-left">ID</th>
                        <th>Name</th>
                        <th>Cook_Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(fastestRecipes).map((topRecipe, index) => (
                        <tr key={topRecipe.recipeID}>
                          <td component="th" scope="row">
                            {topRecipe.recipeID}
                          </td>
                          <td>{topRecipe.value}</td>
                          <td>{topRecipe.value2}</td> 
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>


        <Row>
          <table align="center">
            <tr><td>
              <Col md="12">
                  <Card>
                    <CardHeader>
                      <CardTitle tag="h4">Top 10 Recipes With Best Rating-to-Time</CardTitle>
                        <p className="card-category">
                          Recipes that have a high rating and take the least time
                        </p>
                    </CardHeader>
                    <CardBody>
                      <Table responsive>
                        <thead className="text-primary">
                          <tr>
                            <th className="text-left">ID</th>
                            <th>Name</th>
                            <th>Ratio</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(topRatio).map((topRatio) => (
                            <tr key={topRatio.recipeID}>
                              <td component="th" scope="row">
                                {topRatio.recipeID}
                              </td>
                              <td>{topRatio.value}</td>
                              <td>{topRatio.value2}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card>
                </Col>
            </td><td>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">Top 10 Recipes that use an oven</CardTitle>
                      <p className="card-categor y">
                          Best Rating-to-Time Recipes that use an oven
                      </p>
                  </CardHeader>
                  <CardBody>
                    <Table responsive>
                      <thead className="text-primary">
                        <tr>
                          <th className="text-left">ID</th>
                          <th>Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(topOven).map((topOven) => (
                          <tr key={topOven.recipeID}>
                            <td component="th" scope="row">
                              {topOven.recipeID}
                            </td>
                            <td>{topOven.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
            </td></tr>
          </table>
        </Row>
        </div> 
      </div>

    );
  };
};