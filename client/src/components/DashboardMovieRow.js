import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
export default class DashboardMovieRow extends React.Component {
	render() {
		return (
		<div className="movie">
			<div className="RecipeID">{this.props.RecipeID}</div>
			<div className="RecipeName">{this.props.RecipeName}</div>
		</div>
		);
	};
};
