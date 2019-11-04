import React, { Component } from 'react';
import Board from './components/Board';

export default class App extends Component {
    render() {
        return (
            <div className ="container-fluid">
                <Board/>
            </div>
        );
    }
}