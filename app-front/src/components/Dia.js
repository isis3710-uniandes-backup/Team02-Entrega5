import React, { Component } from 'react';
import '../css/signin.css';
import history from '../history';
import '../css/signin.css'


class Dia extends Component {



    state = {
        username: this.props.username,
        password: this.props.password,
        numero: this.props.dia

    }
    detalle(){
        let ini = "2019-11-04T00:00:00";
        let fin = "2019-11-05T00:00:00";
        //this.props.change();
    }


    render() {
        return (
            <div className="card" >
                <button  className="btn btn-primary dia" width="30px" height="30px" onClick={this.detalle()}>
                    <p>{this.props.value}</p>
                </button>
            </div>
        );
    }
}

export default Dia;