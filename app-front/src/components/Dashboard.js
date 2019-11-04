import React, { Component } from 'react';
import { Chart } from "react-google-charts";
import { data } from "../params";
import { categories } from "../categories";
const axios = require("axios");

class Dashboard extends Component {

    state = {
        chartData: ''
    }

    componentDidMount() {
        this.getChartData()
    }

    getChartData() {
        axios({
            method: "GET",
            url: data.getAllCost,
            headers: { authorization: "Bearer " + localStorage.getItem("token") },
        }).then(res => {
            console.log(res.data);

            let categoriesData = {};

            //Inicializo el diccionario con las categorias, cada una con 'amount' igual a 0
            for (let c of categories) {
                //console.log(c);
                categoriesData[c] = 0;
            }
            console.log(categoriesData);

            //Calcular el total de cada categoria posible
            for (let expense of res.data) {
                //console.log(expense.amount);
                categoriesData[expense.category] += parseInt(expense.amount);
            }
            //console.log(categoriesData);
            this.setState({ chartData: categoriesData });
            console.log(this.state.chartData);
        });
    }

    getData() {
        let data = []
        data.push(['Expenditure', 'Amount']);

        for (let key in this.state.chartData) {
            if (this.state.chartData[key] > 0) {
                console.log("Categoria SI tiene > 0");
                data.push([key, this.state.chartData[key]]);
            }
        }
        console.log(data);
        return data
    }

    render() {
        return (
            <div className="container-float">
                <div className="card shadow bg-light">
                    <div className="card-header">
                        <h3>Your expenses</h3>
                    </div>
                    <div className="card-body">
                        <div className="row justify-content-center">
                            <div className="col-12">
                                <Chart
                                    width={'900px'}
                                    height={'700px'}
                                    chartType="PieChart"
                                    loader={<div>Loading Chart</div>}
                                    data={this.getData()}
                                    options={{
                                        title: 'My expenses',
                                        // Just add this option
                                        is3D: true,
                                        backgroundColor: { fill: 'transparent' }
                                    }}
                                    rootProps={{ 'data-testid': '1' }}
                                />
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        );
    }
}

export default Dashboard;