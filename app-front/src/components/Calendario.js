import React, { Component } from 'react';
import Dia from "./Dia.js";
import '../css/signin.css'

class Calendario extends Component {

    state = {
        username: this.props.username,
        password: this.props.password,
        mesN: 1,
        mesS: "Enero",
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
        for (var j = 11; j < 21; j++) {
            lista[j] = j;
        }
        this.setState({ dias2: lista });
        lista = [];
        for (var k = 21; k < 32; k++) {
            lista[k] = k;
        }
        this.setState({ dias3: lista });
    }

    cambiarMes(mesN, mesS) {
        this.setState({mesN: mesN});
        this.setState({mesS: mesS});

    }

    render() {
        const lista1 = this.state.dias1.map((number, idx) =>
            <Dia key={idx} change={this.props.change} value={number} mes = {this.state.mesN} dia = {number}/>
        );
        const lista2 = this.state.dias2.map((number, idx) =>
            <Dia key={idx} change={this.props.change} value={number} mes = {this.state.mesN} dia = {number}/>
        );
        const lista3 = this.state.dias3.map((number, idx) =>
            <Dia key={idx} change={this.props.change} value={number} mes = {this.state.mesN} dia = {number}/>
        );

   

        return (


            <div className="container-fluid" id="calendario">

                <div className="row">
                    <div className="col 10">
                        <div>
                            <h1 id = "header">{this.state.mesS}</h1>
                        </div>
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
                    <div className="col ">
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Mes
  </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                <button className="dropdown-item" type="button" onClick={() => {this.cambiarMes(1,"Enero")}}>Enero</button>
                                <button className="dropdown-item" type="button" onClick={() => {this.cambiarMes(2, "Febrero")}}>Febrero</button>
                                <button className="dropdown-item" type="button" onClick={() => {this.cambiarMes(3, "Marzo")}}>Marzo</button>
                                <button className="dropdown-item" type="button" onClick={() => {this.cambiarMes(4, "Abril")}}>Abril</button>
                                <button className="dropdown-item" type="button" onClick={() => {this.cambiarMes(5, "Mayo")}}>Mayo</button>
                                <button className="dropdown-item" type="button" onClick={() => {this.cambiarMes(6,  "Junio")}}>Junio</button>
                                <button className="dropdown-item" type="button" onClick={() => {this.cambiarMes(7, "Julio")}}>Julio</button>
                                <button className="dropdown-item" type="button" onClick={() => {this.cambiarMes(8, "Agosto")}}>Agosto</button>
                                <button className="dropdown-item" type="button" onClick={() => {this.cambiarMes(9, "Septiembre")}}>Septiembre</button>
                                <button className="dropdown-item" type="button" onClick={() => {this.cambiarMes(10, "Octubre")}}>Octubre</button>
                                <button className="dropdown-item" type="button" onClick={() => {this.cambiarMes(11, "Noviembre")}}>Noviembre</button>
                                <button className="dropdown-item" type="button" onClick={() => {this.cambiarMes(12, "Diciembre")}}>Diciembre</button>
                            </div>
                        </div>

                    </div>

                </div>


            </div>


        );

    }
}

export default Calendario;