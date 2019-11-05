import React, { Component } from 'react';

export default class UserProfile extends Component {
	render() {
		console.log(this);
		return (
			<div className="center-block justify-content-center">
				<div className="container-fluid justify-content-center">
					<div data-aos="flip-left" data-aos-duration="1000">
						<div id="card-login" className="col-4 centrar card p-3 mb-5 shadow">
							<div className="container-fluid justify-content-center">
								<h1 className="text-center mb4">My profile</h1>
								<img
									src="https://icon-library.net/images/icon-profile/icon-profile-22.jpg"
									alt="logo"
									className="rounded mx-auto d-block img-fluid"
									height="350px"
									width="350px"
								/>
								<h2 className="text-center mt-3">
									{this.props.dataprops.username}
								</h2>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
