import React, { Component } from 'react';

export default class Gasto extends Component {
	componentDidMount() {
		console.log(this.props);
	}

	render() {
		return (
			<div className="col-3 card p-3 mb-5 ml-4 justify-content-center shadow">
				<div className="container-fluid justify-content-center">
					<h1 className="text-center mt-3">{this.props.data.category}</h1>
					<h3 className="text-center mt-3">
						{this.props.data.date.split('T')[0]}
					</h3>

					<h2 className="text-center mt-3">${this.props.data.amount}</h2>
					<h3 className="text-center mt-3">{this.props.data.description}</h3>
				</div>
			</div>
		);
	}
}
