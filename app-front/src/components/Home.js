import React, { Component } from 'react';
import Board from './Board';
import history from '../history';
import UserProfile from './userProfile';
import Calendario from './Calendario.js';
import DailyDashboard from './DailyDashboard';
import GastosList from './GastosList';
import { FormattedMessage } from 'react-intl';
import '../css/signin.css';


class Home extends Component {
	componentDidMount() {
		if (this.props.location.state === undefined) {
			history.replace('/notAuth');
		}
	}

	state = {
		username: this.props.location.state.username,
		password: this.props.location.state.username,
		board: 'board',
		fechaIni: '',
		fechaFin: '',
	};

	// Permite hacer log out en el sistema, regresa al menu de login.
	logOut = () => {
		localStorage.removeItem('token'); //Elimina el token del sistema para que el usuario se autentique nuevamente.
		history.replace('/login'); //Regreso a la ventana de login.
	};

	changeCuenta = () => {
		this.setState({
			board: 'Micuenta'
		});
	};

	changeState = (Ini, Fin) => {
		this.setState({
			board: 'daily',
			fechaIni: Ini,
			fechaFin: Fin,
		});
	}

	changeCalendario = () => {
		this.setState({
			board: 'calendario'
		});
	};

	changeHome = () => {
		this.setState({
			board: 'board'
		});
	};

	changeHistorial = () => {
		this.setState({
			board: 'historial'
		});
	};

	render() {
		return (
			<div>
				<link href="https://fonts.googleapis.com/css?family=Karla|Rubik&display=swap" rel="stylesheet"></link>
				<nav className="navbar fixed-top navbar-expand-lg navbar-dark navconfig">
					<a href="#home-button" className="navbar-brand title text-white">OnlineWallet</a>
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarNavAltMarkup"
						aria-controls="navbarNavAltMarkup"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
						<div className="navbar navbar-inverse">
							<button
								id="home-button"
								className="nav-item nav-link navbutton botones mylabel"
								onClick={this.changeHome}
							>
								<i className="fas fa-home"></i><FormattedMessage id="home.home"/><span className="sr-only">(current)</span>
							</button>
							<button
								className="nav-item nav-link navbutton botones mylabel"
								onClick={this.changeCalendario}
							>
								<i className="fas fa-calendar"></i> <FormattedMessage id="home.calendar"/>
								</button>
							<button
								className="nav-item nav-link navbutton botones mylabel"
								onClick={this.changeHistorial}
							>
								<i className="fas fa-clock"></i> <FormattedMessage id="home.history"/>
							</button>
							<button
								className="nav-item nav-link navbutton botones mylabel"
								onClick={this.changeCuenta}
							>
								<i className="fas fa-user-alt"></i> <FormattedMessage id="home.myaccount"/>
							</button>
						</div>
					</div>
					<div>
						<button className="btn button-rounded btn-danger mylabel" onClick={this.logOut} >
							<FormattedMessage id="home.logout"/>
						</button>
					</div>
				</nav>
				<br></br>
				<br></br>
				<br></br>
				<br></br>
				{(this.state.board === 'board') ? (
					<Board
						username={this.state.username}
						password={this.state.password}
					/>
				) : this.state.board === 'Micuenta' ? (
					<UserProfile dataprops={this.state} />
				) : this.state.board === 'historial' ? (
					<GastosList
						username={this.state.username}
						password={this.state.password}
					/>
				) : this.state.board === 'calendario' ? (<Calendario username={this.state.username}
					password={this.state.password} change={this.changeState} />)
								: (<DailyDashboard username={this.state.username}
									password={this.state.password} fechaIni={this.state.fechaIni} fechaFin={this.state.fechaFin} />)}
			</div>
		);
	}
}

export default Home;
