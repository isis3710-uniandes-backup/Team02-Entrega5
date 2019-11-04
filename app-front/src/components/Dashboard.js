import React, { Component } from 'react';
import { Chart } from "react-google-charts";

class Dashboard extends Component {

    state = {
        chartData: ''
    }

    componentDidMount() {
        
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
                                    data={this.props.data}
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