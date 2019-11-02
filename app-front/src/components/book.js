import React, { Component } from 'react';

export default class Book extends Component {

    componentDidMount() {
        //Guarda el estado del componente por el valor pasado por el properties.
        this.setState({
            book: this.props.value            
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <h5> Book Title: {this.props.value.name}</h5>
                <ul>
                    <li> ISBN: {this.props.value.isbn}</li>
                    <li> Author: {this.props.value.author}</li>
                    <li> Publisher: {this.props.value.publisher}</li>
                    <li> Cost: {this.props.value.cost} </li>
                </ul>
            </div>
        );
    }
}