import React, { Component } from 'react';
import { Chart } from "react-google-charts";
import '../css/signin.css';


class Dashboard extends Component {

    state = {
        chartData: '',
        filteredData: this.props.data,
        showFiltered: false
    }

    componentDidMount() {
        //console.log(this.props.data);
    }

    clickFilter = () => {
        //console.log(this.props.data);
        //this.refs.description.value = '';
        let filteredData = [];
        //console.log(filteredData);

        for (let i of this.props.data) {
            //console.log(this.refs["Laundry"].checked);
            if (i[0] === "Expenditure") {
                continue;
            }
            //console.log(i[0]);
            //console.log(this.refs[i[0]]);
            if (this.refs[i[0]].checked) {
                //console.log(i);
                filteredData.push(i);
            }
        }
        if (filteredData.length > 0) {
            //console.log("No hay longitud");
            //Le agregamos cabecera
            filteredData.unshift(this.props.data[0]);
            //console.log(filteredData);
            //Le hacemos setSate a filteredData
            this.setState({ filteredData: filteredData });
            this.setState({ showFiltered: true });
        } else {
            this.setState({ filteredData: filteredData });
            this.setState({ showFiltered: false });
        }


    }

    clickClearFilter = () => {
        /*
        this.props.data.filter(element => element[0] !== "Expenditure").map((element) => {
            this.refs[element[0]].checked = false;
        })*/

        let aux = this.props.data.filter(element => element[0] !== "Expenditure");
        for (let element of aux){
            this.refs[element[0]].checked = false;
        }


        this.setState({ showFiltered: false });
    }

    checkData() {
        if (!this.state.showFiltered) {
            return this.props.data;
        } else {
            return this.state.filteredData;
        }
    }

    render() {
        return (
            <div className="container-float">
                <link href="https://fonts.googleapis.com/css?family=Karla|Rubik&display=swap" rel="stylesheet"></link>
                <div className="row">
                    <div className="col-9">
                        <div className="card shadow chart-card">
                            <div className="card-header text-center">
                                <h1 id = "bienv">Welcome back {this.props.username.charAt(0).toUpperCase() + this.props.username.slice(1)}!</h1>
                            </div>
                            <div className="card-body" id="card">
                                <div className="row justify-content-center">
                                    <div className="col-12">
                                        <Chart
                                            width={'800px'}
                                            height={'600px'}
                                            chartType="PieChart"
                                            loader={<div>Loading Chart...</div>}
                                            data={this.checkData()}
                                            options={{
                                                title: 'Your expenses',
                                                // Just add this option
                                                is3D: true,
                                                backgroundColor: { fill: 'transparent' },
                                                chartArea: { 'width': '95%', 'height': '85%' },
                                                titleTextStyle: {
                                                    fontName: 'Rubik',
                                                    fontSize: 30, // 12, 18 whatever you want (don't specify px)
                                                    bold: true,    // true or false

                                                },
                                            }}
                                            rootProps={{ 'data-testid': '1' }}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="cards shadow bg-light">
                            <div className="card-header">
                                <h2 id = "filter">Filter</h2>
                            </div>
                            <div className="card-body">
                                {this.props.data.filter(element => element[0] !== "Expenditure").map(
                                    (item, idx) => <div key={idx} className="custom-control custom-checkbox mylabel"><input type="checkbox" className="custom-control-input" id={item[0]} ref={item[0]}></input><label className="custom-control-label" htmlFor={item[0]}>{item[0]}</label></div>
                                )}

                                <hr></hr>
                                <div className="row text-center">
                                    <div className="col-6">
                                        <button className="btn btn-danger btn-sm mylabel" onClick={this.clickClearFilter}>Clear</button>
                                    </div>
                                    <div className="col-6">
                                        <button type="submit" value="Submit" className="btn btn-warning btn-sm mylabel" onClick={this.clickFilter}>Filter</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Dashboard;