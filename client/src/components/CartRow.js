import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/Account.css';

export default class CartRow extends React.Component {
	render() {
		return (
			<div className="recipeResults">
				<div className="name"><center><b>{this.props.name}</b></center></div>
				<center><img className="img" src={this.props.img}></img></center>
				<br></br>
				<div className="rating"><b>Rating:</b> {this.props.rating}</div>
				<div className="author"><b>Author:</b> {this.props.author}</div>
				<div className="cooktime"><b>Ingredients:</b> {this.props.totalcooktime}</div>
			</div>
		);
	};
};
