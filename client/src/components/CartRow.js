import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/BestMovies.css';

export default class CartRow extends React.Component {
	render() {
		return (
			<div className="recipeResults">
				<div className="name">Recipe Name: {this.props.name}</div>
				<img className="img" src={this.props.img}></img>
				<div className="rating">Rating: {this.props.rating}</div>
				<div className="author">Author: {this.props.author}</div>
				<div className="cooktime">Ingredients: {this.props.totalcooktime}</div>
			</div>
		);
	};
};
