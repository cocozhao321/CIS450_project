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
import GoogleLogin from 'react-google-login';

export default class App extends React.Component {

	render() {
	  const responseGoogle = (response) => {
      console.log(response);
    }
		return (
			<div className="App">
			<h1>CIS450 Project</h1>
				<GoogleLogin
        clientId="308175231537-mle1mv1fo3ltil5am0lf0a3d22mevn8b.apps.googleusercontent.com" 
        
        buttonText="LOGIN WITH GOOGLE"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
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