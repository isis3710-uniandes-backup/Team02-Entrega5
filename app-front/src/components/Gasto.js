import React, { Component } from 'react';
import { FormattedDate, FormattedNumber, FormattedMessage } from "react-intl";

export default class Gasto extends Component {
	componentDidMount() {
		//console.log(this.props);
	}

	checkCategoryIcon() {
		if (this.props.data.category === "Food") {
			return <i className="fas fa-utensils fa-5x"></i>
		} else if (this.props.data.category === "Shopping") {
			return <i className="fas fa-shopping-cart fa-5x"></i>
		} else if (this.props.data.category === "Services") {
			return <i className="fas fa-concierge-bell fa-5x"></i>
		} else if (this.props.data.category === "Laundry") {
			return <i className="fas fa-bath fa-5x"></i>
		}else if (this.props.data.category === "Car") {
			return <i className="fas fa-car fa-5x"></i>
		}else if (this.props.data.category === "Phone") {
			return <i className="fas fa-phone fa-5x"></i>
		}else if (this.props.data.category === "House") {
			return <i className="fas fa-home fa-5x"></i>
		}else if (this.props.data.category === "Technology") {
			return <i className="fas fa-laptop fa-5x"></i>
		}else if (this.props.data.category === "Water") {
			return <i className="fas fa-tint fa-5x"></i>
		}else if (this.props.data.category === "Energy") {
			return <i className="fas fa-lightbulb fa-5x"></i>
		}else if (this.props.data.category === "Gas") {
			return <i className="fas fa-gas-pump fa-5x"></i>
		}else if (this.props.data.category === "Clothing") {
			return <i className="fas fa-tshirt fa-5x"></i>
		}else if (this.props.data.category === "Education") {
			return <i className="fas fa-university fa-5x"></i>
		}else if (this.props.data.category === "Health care") {
			return <i className="fas fa-heartbeat fa-5x"></i>
		}else if (this.props.data.category === "Savings") {
			return <i className="fas fa-wallet fa-5x"></i>
		}else if (this.props.data.category === "Transportation") {
			return <i className="fas fa-bus-alt fa-5x"></i>
		}else if (this.props.data.category === "Insurance") {
			return <i className="fas fa-car-crash fa-5x"></i>
		}else if (this.props.data.category === "Gasoline and motor fuels") {
			return <i className="fas fa-gas-pump fa-5x"></i>
		}else if (this.props.data.category === "Travel") {
			return <i className="fas fa-plane-departure fa-5x"></i>
		}else if (this.props.data.category === "Labor costs") {
			return <i className="fas fa-briefcase fa-5x"></i>
		}
	}


	render() {
		return (
			<div className="col-3 card p-3 mb-5 ml-4 justify-content-center shadow">
				<div className="text-center">
					{this.checkCategoryIcon()}
				</div>
				<br></br>
				<ul className="list-group mylabel">
					<li className="list-group-item list-group-item"><i className="fas fa-marker"></i><strong><FormattedMessage id="cost.category"/></strong> {this.props.data.category} </li>
					<li className="list-group-item list-group-item">
						<i className="fas fa-calendar"></i>
						<strong><FormattedMessage id="expenditure.date"/>  </strong>
						<FormattedDate
            				value={new Date(this.props.data.date.split('T')[0])}
            				year="numeric"
							month="long"
							day="numeric"
							weekday="long"
          				/>						 
					</li>
					<li className="list-group-item list-group-item">
						<i className="fas fa-money-bill"></i> 
						<strong><FormattedMessage id="expenditure.amount"/>  </strong>
						<FormattedNumber 
							value={this.props.data.amount}
						/> 						
					</li>
					<li className="list-group-item list-group-item"><i className="fas fa-align-left"></i> <strong><FormattedMessage id="expenditure.description"/></strong> {this.props.data.description} </li>
				</ul>
			</div>
		);
	}
}
