import React, { Component } from 'react';
import Board from './components/Board';

export default class App extends Component {

    state = {
        user: this.props.location.user
    }

    componentDidMount(){
        console.log("User: " + this.state.user)
    }

    render() {
        return (
            <div className ="container-fluid">

            </div>
        );
    }
}