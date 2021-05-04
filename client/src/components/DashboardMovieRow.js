import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

/*
			<div className="movie">
				<div className="RecipeID">{this.props.RecipeID}</div>
				<div className="RecipeName">{this.props.RecipeName}</div>
			</div>
			*/

export default class DashboardMovieRow extends React.Component {
	render() {
		return (
			<TableContainer component={Paper}>
				<Table className={"Hi"} aria-label="simple table">
					<TableHead>
					<TableRow>
						<TableCell>Recipe ID</TableCell>
						<TableCell align="right">Recipe&nbsp; Name</TableCell>
					</TableRow>
					</TableHead>
					<TableBody>
					
					</TableBody>
				</Table>
			</TableContainer>
		);
	};
};
