import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import App from './App';
import history from './history';
import Login from './components/login';
import BookList from './components/bookList';
import SignIn from './components/signin';
import Home from './components/Home';
import NotAuth from './components/notAuth';

//Internacionalizar.
import {IntlProvider} from 'react-intl';
import Spanish from './languages/es-ES';
import English from './languages/en';

export const makeRoutes = () => {
	let language = navigator.language;
	let tags; //Archivo JSON con los tags
	
	switch (language) {
		case 'es-ES':
			tags = Spanish;
			break;
		case 'en':
			tags = English;
			break;
		default:
			tags = English;
			break;			
	}

	return (
		<IntlProvider locale={language} messages={tags}>
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
		</IntlProvider>
	);
};
