import React, { Component } from 'react';

import { data } from '../params';
import Gasto from './Gasto';
const axios = require('axios');

export default class GastosList extends Component {
	state = {
		username: this.props.username,
		password: this.props.password,
		data: [],
		load: false
	};

	componentDidMount() {
		this.getChartData();
	}

	getChartData = () => {
		axios({
			method: 'GET',
			url: data.getAllCost,
			headers: { authorization: 'Bearer ' + localStorage.getItem('token') }
		}).then(res => {
			this.setState({
				data: res.data,
				load: true
			});
		});
	};
	render() {
		return (
			<div className="container-fluid ">
				<div className="row justify-content-center">
					{this.state.load ? (
						this.state.data.map((g, i) => <Gasto data={g} key={i} />)
					) : (
						<p>No data</p>
					)}
				</div>
			</div>
		);
	}
}
