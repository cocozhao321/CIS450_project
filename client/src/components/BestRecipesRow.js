import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class BestRecipesRow extends React.Component {
	render() {
		return (
			<div className="recipeResults">
				<h6>{this.props.name}</h6>
				<img className="img" src={this.props.img}></img>
				<div className="rating">Rating: {this.props.rating.toFixed(2)}</div>
			</div>
		);
	};
};
