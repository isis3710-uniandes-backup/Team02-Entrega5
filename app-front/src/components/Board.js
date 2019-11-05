import React, { Component } from 'react';
import Expenditure from './Expenditure';
import Dashboard from './Dashboard';
import { data } from "../params";
import { categories } from "../categories";
const axios = require("axios");

class Board extends Component {

    state = {
        username: this.props.username,
        password: this.props.password,
        chartData: ''
    }

    componentDidMount() {
        //console.log("Username: " + this.state.username)
        //console.log("Password: " + this.state.password)
        this.getChartData();
    }

    getChartData = () => {
        axios({
            method: "GET",
            url: data.getAllCost,
            headers: { authorization: "Bearer " + localStorage.getItem("token") },
        }).then(res => {
            //console.log(res.data);
            let categoriesData = {};
            //Inicializo el diccionario con las categorias, cada una con 'amount' igual a 0
            for (let c of categories) {
                //console.log(c);
                categoriesData[c] = 0;
            }
            //console.log(categoriesData);
            //Calcular el total de cada categoria posible
            for (let expense of res.data) {
                //console.log(expense.amount);
                categoriesData[expense.category] += parseInt(expense.amount);
            }
            //console.log(categoriesData);
            this.setState({ chartData: categoriesData });
            //console.log(this.state.chartData);
        });
    }

    getData() {
        let data = []
        data.push(['Expenditure', 'Amount']);

        for (let key in this.state.chartData) {
            if (this.state.chartData[key] > 0) {
                //console.log("Categoria SI tiene > 0");
                data.push([key, this.state.chartData[key]]);
            }
        }
        //console.log(data);
        return data
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-4">
                        <Expenditure username={this.state.username} key={this.state.username} password={this.state.password} refreshData={this.getChartData} />
                    </div>
                    <div className="col-8">
                        <Dashboard key="Dashboard" username={this.state.username} password={this.state.password} data={this.getData()}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Board;