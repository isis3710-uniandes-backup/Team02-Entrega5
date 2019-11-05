import React, { Component } from "react";
import { data } from "../params";
import history from "../history";
import '../css/signin.css'
const axios = require("axios");

export default class SignIn extends Component {

  state = {
    fullname: "",
    username: "",
    email: "",
    password: ""
  }

  //Habilitar el formulario de registro del usuario.
  clickSignIn = async event => {
    event.preventDefault();
    this.setState({ role: "guest" }); //Pone al nuevo usuario con permisos de cliente.

    //Verificar que todos los campos sean correctos.
    let empty = "";
    for (const [key, value] of Object.entries(this.state)) {
      if (value.length === 0) {
        empty += `The field ${key} is empty \n`;
      }
    }

    if (empty.length !== 0) {
      return alert(empty);
    }

    try {
      let message = await axios.post(data.addUser, this.state); //Toma los datos del estado.
      alert(message.data);
      history.replace("/login"); //Avanzar de vista.
    }
    catch (err) {
      if (err.request.status === 400) {
        alert(err.response.data.message);
      }
      else { alert(err); }
    }
  };

  clickCancel = () => {
    history.replace("/login");
  }

  render() {
    return (
      <div className="center-block justify-content-center" >
        <div className="container-fluid justify-content-center">
          <div data-aos="flip-left" data-aos-duration="1000">
            <div
              id="card-login"
              className="col-4 centrar card p-3 mb-5 shadow"
            >
              <div className="container-fluid justify-content-center">
                <h1 className="text-center mb4">Online Wallet</h1>
                <img
                  src="http://www.freepngclipart.com/download/handbag/78586-handbag-wallet-computer-cash-icons-png-download-free.png"
                  alt="wallet"
                  className="rounded mx-auto d-block img-fluid"
                  height="180px"
                  width="180px"
                />
                <h2 className="text-center mt-3">Register</h2>
              </div>
              <form className="container-fluid" noValidate>
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="fName"
                    className="form-control"
                    id="fName"
                    placeholder="Enter your fullname"
                    aria-label="User's fullname"
                    onChange={evt => this.setState({ fullname: evt.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    name="uName"
                    className="form-control"
                    id="userName"
                    placeholder="Enter your username"
                    aria-label="Username Field"
                    onChange={evt => this.setState({ username: evt.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label id="email-label">Email</label>
                  <input
                    type="email"
                    name="uemail"
                    className="form-control"
                    id="userEmail"
                    placeholder="Enter your email"
                    label="Password Field"
                    aria-labelledby="email-label"
                    onChange={evt => this.setState({ email: evt.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label id="password-label">Password</label>
                  <input
                    type="password"
                    name="uPass"
                    className="form-control"
                    id="userPass"
                    placeholder="User's account password"
                    label="Password Field"
                    aria-labelledby="password-label"
                    onChange={evt => this.setState({ password: evt.target.value })}
                    required
                  />
                </div>
                <div className="row justify-content-center">
                  <button
                    type="button"
                    onClick={this.clickCancel}
                    className="btn btn-secondary m-3 mylabel"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={this.clickSignIn}
                    className="btn btn-warning m-3 mylabel"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
