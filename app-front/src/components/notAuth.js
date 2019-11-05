import React, { Component } from 'react';
import history from '../history';

export default class notAuth extends Component {
	clickSignIn = () => {
		history.replace('/login'); //Avanzar de vista.
	};

	render() {
		return (
			<div className="center-block justify-content-center">
				<div className="container-fluid justify-content-center">
					<div data-aos="flip-left" data-aos-duration="1000">
						<div id="card-login" className="col-4 centrar card p-3 mb-5 shadow">
							<div className="container-fluid justify-content-center">
								<h1 className="text-center mb4">Security</h1>
								<img
									src="https://housing.umn.edu/sites/housing.umn.edu/files/security_monitor_icon.png"
									alt="logo"
									className="rounded mx-auto d-block img-fluid"
									height="350px"
									width="350px"
								/>
								<h2 className="text-center mt-3">Ups...</h2>
							</div>
							<form className="container-fluid">
								<div className="form-group">
									<label>
										It seems that you are not registred... please log in
									</label>
								</div>
								<div className="form-group"></div>
								<div className="row justify-content-center">
									<button
										type="button"
										onClick={this.clickSignIn}
										className="btn btn-success m-3"
									>
										{' '}
										Log In{' '}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
