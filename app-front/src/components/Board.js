import React, { Component } from 'react';
import Expenditure from './Expenditure';
import Dashboard from './Dashboard';

class Board extends Component {

    state = {
        username: this.props.location.state.username,
        password: this.props.location.state.password,
    }

    componentDidMount() {
        console.log("Username: " + this.state.username)
        console.log("Password: " + this.state.password)
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-4">
                        <Expenditure username={this.state.username} password={this.state.password}/>
                    </div>
                    <div className="col-8">
                        <Dashboard username={this.state.username} password={this.state.password}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Board;