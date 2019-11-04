import React, { Component } from 'react';
import { Chart } from "react-google-charts";
import { whileStatement } from 'babel-types';

class Dashboard extends Component {

    state = {
        chartData: ''
    }

    componentDidMount() {
        
    }

    

    render() {
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
                                    width={'900px'}
                                    height={'700px'}
                                    chartType="PieChart"
                                    loader={<div>Loading Chart...</div>}
                                    data={this.props.data}
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
}

export default Dashboard;