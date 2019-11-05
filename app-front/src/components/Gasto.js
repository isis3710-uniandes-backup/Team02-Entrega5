import React, { Component } from 'react';

export default class Gasto extends Component {
	componentDidMount() {
		console.log(this.props);
	}

	checkCategoryIcon() {
		if (this.props.data.category === "Food") {
			return <i class="fas fa-utensils fa-5x"></i>
		} else if (this.props.data.category === "Shopping") {
			return <i class="fas fa-shopping-cart fa-5x"></i>
		} else if (this.props.data.category === "Services") {
			return <i class="fas fa-concierge-bell fa-5x"></i>
		} else if (this.props.data.category === "Laundry") {
			return <i class="fas fa-bath fa-5x"></i>
		}else if (this.props.data.category === "Car") {
			return <i class="fas fa-car fa-5x"></i>
		}else if (this.props.data.category === "Phone") {
			return <i class="fas fa-phone fa-5x"></i>
		}else if (this.props.data.category === "House") {
			return <i class="fas fa-home fa-5x"></i>
		}else if (this.props.data.category === "Technology") {
			return <i class="fas fa-laptop fa-5x"></i>
		}else if (this.props.data.category === "Water") {
			return <i class="fas fa-tint fa-5x"></i>
		}else if (this.props.data.category === "Energy") {
			return <i class="fas fa-lightbulb fa-5x"></i>
		}else if (this.props.data.category === "Gas") {
			return <i class="fas fa-gas-pump fa-5x"></i>
		}else if (this.props.data.category === "Clothing") {
			return <i class="fas fa-tshirt fa-5x"></i>
		}else if (this.props.data.category === "Education") {
			return <i class="fas fa-university fa-5x"></i>
		}else if (this.props.data.category === "Health care") {
			return <i class="fas fa-heartbeat fa-5x"></i>
		}else if (this.props.data.category === "Savings") {
			return <i class="fas fa-wallet fa-5x"></i>
		}else if (this.props.data.category === "Transportation") {
			return <i class="fas fa-bus-alt fa-5x"></i>
		}else if (this.props.data.category === "Insurance") {
			return <i class="fas fa-car-crash fa-5x"></i>
		}else if (this.props.data.category === "Gasoline and motor fuels") {
			return <i class="fas fa-gas-pump fa-5x"></i>
		}else if (this.props.data.category === "Travel") {
			return <i class="fas fa-plane-departure fa-5x"></i>
		}else if (this.props.data.category === "Labor costs") {
			return <i class="fas fa-briefcase fa-5x"></i>
		}
	}


	render() {
		return (
			<div className="col-3 card p-3 mb-5 ml-4 justify-content-center shadow">
				<div className="text-center">
					{this.checkCategoryIcon()}
				</div>
				<br></br>
				<ul className="list-group">
					<li className="list-group-item list-group-item-light"><i class="fas fa-marker"></i><strong> Category:</strong> {this.props.data.category} </li>
					<li className="list-group-item list-group-item-light"><i class="fas fa-calendar"></i><strong> Date:</strong> {this.props.data.date.split('T')[0]} </li>
					<li className="list-group-item list-group-item-light"><i class="fas fa-money-bill"></i> <strong> Amount:</strong> ${this.props.data.amount} </li>
					<li className="list-group-item list-group-item-light"><i class="fas fa-align-left"></i> <strong>  Description:</strong> {this.props.data.description} </li>

				</ul>



			</div>
		);
	}
}
