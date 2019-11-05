import React, { Component } from 'react';
import Dia from "./Dia.js";
import '../css/signin.css'

class Calendario extends Component {

    state = {
        username: this.props.username,
        password: this.props.password,
        dias1: [],
        dias2: [],
        dias3: [],

    }

    componentDidMount() {

        let lista = [];
        for (var i = 1; i < 11; i++) {
            lista[i] = i;
        }
        this.setState({ dias1: lista });
        lista = [];
        for (var i = 11; i < 21; i++) {
            lista[i] = i;
        }
        this.setState({ dias2: lista });
        lista = [];
        for (var i = 21; i < 32; i++) {
            lista[i] = i;
        }
        this.setState({ dias3: lista });
    }


    render() {
        const lista1 = this.state.dias1.map((number) =>
            <Dia value={number} />
        );
        const lista2 = this.state.dias2.map((number) =>
            <Dia value={number} />
        );
        const lista3 = this.state.dias3.map((number) =>
            <Dia value={number} />
        );



        return (
            <div className="container-fluid" id="calendario">
                <div className="row">
                    {lista1}
                </div>
                <div className="row">
                    {lista2}
                </div>
                <div className="row">
                    {lista3}
                </div>

            </div>


        );

    }
}

export default Calendario;