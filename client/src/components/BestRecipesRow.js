import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class BestRecipesRow extends React.Component {
	/* ---- Q3b (Best Movies) ---- */
	render() {
		return (
			<div className="recipeResults">
				<div className="name">Recipe Name: {this.props.name}</div>
				<img className="img" src={this.props.img}></img>
				<div className="rating">Rating: {this.props.rating}</div>
			</div>
		);
	};
};
