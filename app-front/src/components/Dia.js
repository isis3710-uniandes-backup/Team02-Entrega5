import React, { Component } from 'react';
import '../css/signin.css'

class Dia extends Component {



    state = {
        username: this.props.username,
        password: this.props.password,
        numero: this.props.dia

    }


    render() {
        return (
            <div className="card" >
                <button  className="btn btn-primary dia" width="30px" height="30px">
                    <p>{this.props.value}</p>
                </button>
            </div>
        );
    }
}

export default Dia;