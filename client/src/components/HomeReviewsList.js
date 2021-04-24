import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

export default class HomeReviewsList extends React.Component {

	/* ---- Q1b (Dashboard) ---- */
	render() {
		return (
			<div className="movie">
				<div className="RecipeID">{this.props.RecipeID}</div>
				<div className="Name"> {this.props.Name} </div>
				<div className="Review_Count"> {this.props.Review_Count} </div>
			</div>
		);
	};
};
