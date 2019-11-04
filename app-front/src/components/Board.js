import React, { Component } from 'react';
import Expenditure from './Expenditure';

class Board extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-4">
                        <Expenditure/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Board;