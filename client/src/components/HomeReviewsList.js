import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

export default class HomeReviewsList extends React.Component {

	/* ---- Q1b (Dashboard) ---- */
	render() {
		return (
			<div className="movie">
				<div className="RecipeID">{this.props.RecipeID}</div>
				<div className="RecipeName"> {this.props.RecipeName} </div>
				<div className="ReviewCount"> {this.props.ReviewCount} </div>
			</div>
		);
	};
};
