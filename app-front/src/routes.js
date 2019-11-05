import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import App from './App';
import history from './history';
import Login from './components/login';
import BookList from './components/bookList';
import SignIn from './components/signin';
import Home from './components/Home';
import NotAuth from './components/notAuth';
import DailyDashboard from './components/DailyDashboard';

export const makeRoutes = () => {
	return (
		<Router history={history}>
			<Switch>
				<>
					<Route path="/" render={props => <App {...props} />} />
					<Route path="/home" render={props => <Home {...props} />} />
					<Route path="/login" render={props => <Login {...props} />} />
					<Route path="/getBooks" render={props => <BookList {...props} />} />
					<Route path="/signin" render={props => <SignIn {...props} />} />
					<Route path="/notAuth" render={props => <NotAuth />} />
				</>
			</Switch>
		</Router>
	);
};
