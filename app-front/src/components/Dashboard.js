import React, { Component } from 'react';
import { Chart } from "react-google-charts";

class Dashboard extends Component {

    componentDidMount() {

    }

    getChartData() {

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
                                    width={'800px'}
                                    height={'600px'}
                                    chartType="PieChart"
                                    loader={<div>Loading Chart</div>}
                                    data={[
                                        ['Task', 'Hours per Day'],
                                        ['Work', 11],
                                        ['Eat', 2],
                                        ['Commute', 2],
                                        ['Watch TV', 2],
                                        ['Sleep', 7],
                                    ]}
                                    options={{
                                        title: 'My expenses',
                                        // Just add this option
                                        is3D: true,
                                        backgroundColor: { fill:'transparent' }
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