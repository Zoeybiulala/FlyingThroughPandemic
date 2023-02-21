import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import Dashboard from './Dashboard';

export default function App() {

	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact
						path="/"
						render={() => (
							<Dashboard />
						)} />
					<Route exact
						path="/dashboard"
						render={() => (
							<Dashboard />
						)} />

				</Switch>
			</Router>
		</div>
	);

}