import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class SearchRow extends React.Component {
	render() {
		return (
			<div className="recipeResults">
				<div className="name">Recipe Name: {this.props.name}</div>
				<img className="img" src={this.props.img}></img>
				<div className="rating">Rating: {this.props.rating}</div>
				<div className="author">Author: {this.props.author}</div>
				<div className="cooktime">Cook Time: {this.props.totalcooktime}</div>
			</div>
		);
	};
};
