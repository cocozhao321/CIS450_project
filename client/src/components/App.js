import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import Home from './Home';
import Calories from './Calories';
import Account from './Account';
import Search from './Search';

import "bootstrap/dist/css/bootstrap.css";
import "./assets/scss/paper-dashboard.scss?v=1.2.0";
import "./assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

export default class App extends React.Component {

	render() {
		return (
			<div className="App">
				<Router>
					<Switch>
						<Route
							exact
							path="/"
							render={() => <Home />}
						/>
						<Route
							exact
							path="/home"
							render={() => <Home />}
						/>
						<Route
							path="/calories"
							render={() => <Calories />}
						/>
						<Route
							path="/search"
							render={() => <Search />}
						/>
            			<Route
							path="/account"
							render={() => <Account />}
						/>
					</Switch>
				</Router>
			</div>
		);
	};
};