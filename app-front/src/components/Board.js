import React, { Component } from 'react';
import Expenditure from './Expenditure';
import Dashboard from './Dashboard';

class Board extends Component {

    state = {
        user: this.props.location.user
    }

    componentDidMount() {
        console.log("User: " + this.state.user)
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-4">
                        <Expenditure />
                    </div>
                    <div className="col-8">
                        <Dashboard />
                    </div>
                </div>
            </div>
        );
    }
}

export default Board;