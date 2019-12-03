import React, { Component } from 'react';
import '../css/signin.css';


class Dia extends Component {

    state = {
        username: this.props.username,
        password: this.props.password,
        numero: this.props.dia

    }
    detalle(){
        let numero;
        let mes;
        let dia2 = this.state.numero +1;
        if(this.state.numero<10){
            numero = "0" + this.state.numero.toString();
        }
        else{
            numero = this.state.numero.toString();
        }
        if(dia2<10){
            dia2= "0"+dia2.toString();
        }
        else{
            dia2 = dia2.toString();
        }
        if(this.props.mes<10){
            mes = "0"+ this.props.mes.toString();
        }
        else{
            mes = this.props.mes.toString();
        }
        //console.log(mes);
        //console.log(numero);

        let ini = "2019-"+mes+"-"+numero;
        let fin = "2019-"+mes+"-"+dia2;
        this.props.change(ini,fin);
    }


    render() {
        return (
            <div className="card" >
                <button  className="btn btn-primary dia" width="35px" height="35px" onClick={() => { this.detalle() }}>
                    <p style={{fontSize: 45,}}>{this.props.value}</p>
                </button>
            </div>
        );
    }
}

export default Dia;