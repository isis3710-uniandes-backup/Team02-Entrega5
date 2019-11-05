import React, { Component } from 'react';
import { Chart } from "react-google-charts";
import { data } from "../params";
import { categories } from "../categories";
const axios = require("axios");
class DailyDashboard extends Component {
    
    state = {
        chartData: ''
    }

    componentDidMount() {
        this.getChartData();
    }

    getChartData = () => {
        const fechaini = this.props.fechaIni;
        const fechaFin = this.props.fechaFin;
        axios({
            method: "POST",
            url: data.getCostTime,
            headers: { authorization: "Bearer " + localStorage.getItem("token") },
            data:{
                inicialTime:fechaini,
                finalTime: fechaFin,
            },
        }).then(res => {
            let categoriesData = {};
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
        if(this.props.username!== undefined){
            return (
                <div className="container-float">
                    <div className="card shadow chart-card">
                        <div className="card-header text-center">
                            <h3>Welcome back {this.props.username.charAt(0).toUpperCase() + this.props.username.slice(1)}!</h3>
                        </div>
                        <div className="card-body">
                            <div className="row justify-content-center">
                                <div className="col-12">
                                    <Chart
                                        width={'800px'}
                                        height={'600px'}
                                        chartType="PieChart"
                                        loader={<div>Loading Chart...</div>}
                                        data={this.getData()}
                                        options={{
                                            title: 'Your expenses',
                                            // Just add this option
                                            is3D: true,
                                            backgroundColor: { fill: 'transparent' },
                                            chartArea: {'width': '95%', 'height': '85%'},
                                            titleTextStyle: {
                                                fontSize: 30, // 12, 18 whatever you want (don't specify px)
                                                bold: true,    // true or false
    
                                            }
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
        else{
            return(<div>No ha iniciado sesión</div>)
        }
        
    }
}


export default DailyDashboard;