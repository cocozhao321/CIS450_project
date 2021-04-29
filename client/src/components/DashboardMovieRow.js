import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

export default class DashboardMovieRow extends React.Component {

	/* ---- Q1b (Dashboard) ---- */
	/* Change the contents (NOT THE STRUCTURE) of the HTML elements to show a movie row. */
	render() {
		return (
			<div className="movie">
				<div className="RecipeID">{this.props.RecipeID}</div>
				<div className="RecipeName">{this.props.RecipeName}</div>
			</div>
		);
	};
};
