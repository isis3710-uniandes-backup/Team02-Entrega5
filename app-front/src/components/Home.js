import React, { Component } from 'react';
import Board from './Board';
import history from '../history';
import UserProfile from './userProfile';
import Calendario from './Calendario.js';

class Home extends Component {
	componentDidMount() {
		if (this.props.location.state === undefined) {
			history.replace('/notAuth');
		} else {
			this.setState({
				username: this.props.location.state.username,
				password: this.props.location.state.password
			});
		}
	}

	state = {
		username: '',
		password: '',
		board: 'board'
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

	render() {
		return (
			<div>
				<nav className="navbar fixed-top navbar-expand-lg navbar-dark navconfig">
					<h5 className="navbar-brand">OnlineWallet</h5>
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
						<div className="navbar-nav">
							<button
								className="nav-item nav-link navbutton"
								onClick={this.changeHome}
							>
								Home <span className="sr-only">(current)</span>
							</button>
							<button
								className="nav-item nav-link navbutton"
								onClick={this.changeCuenta}
							>
								Mi Cuenta
							</button>

							<button
								className="nav-item nav-link navbutton"
								onClick={this.changeCalendario}
							>
								Calendario
							</button>
						</div>
					</div>
					<div>
						<button className="btn btn-danger" onClick={this.logOut}>
							Log Out
						</button>
					</div>
				</nav>
				<br></br>
				<br></br>
				<br></br>
				{(this.state.board === 'board') ? (
					<Board
						username={this.state.username}
						password={this.state.password}
					/>
				) : ((this.state.board==='calendario')?(
					<Calendario dataprops={this.state} />
				):(<UserProfile dataprops={this.state}/>))}
			</div>
		);
	}
}

export default Home;
