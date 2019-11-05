import React, { Component } from 'react';
import '../css/signin.css';

class Dia extends Component {



    state = {
        username: this.props.username,
        password: this.props.password,
        numero: this.props.dia

    }
    detalle(){
        let ini = "2019-06-11";
        let fin = "2019-07-11";
        this.props.change(ini,fin);
    }


    render() {
        return (
            <div className="card" >
                <button  className="btn btn-primary dia" width="30px" height="30px" onClick={() => { this.detalle() }}>
                    <p>{this.props.value}</p>
                </button>
            </div>
        );
    }
}

export default Dia;