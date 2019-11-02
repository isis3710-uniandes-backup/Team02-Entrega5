import React, { Component } from "react";
import { data } from "../params";
import Book from "./book";
import "../css/signin.css"
import history from "../history";
const axios = require("axios");

export default class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      isLoaded: false,
      isError: false
    };
  }

  componentDidMount() {
    this.getBooks();
  }

  // Permite hacer log out en el sistema, regresa al menu de login.
  logOut = () => {
    localStorage.removeItem("token"); //Elimina el token del sistema para que el usuario se autentique nuevamente.
    history.replace("/login"); //Regreso a la ventana de login.
  }


  // Recupera la lista de libros dado los permisos del usuario.
  // En caso de ser un usuario guest lanzara error 403, si es admin los mostrara.

  getBooks = async () => {
    //Consulta al Endpoint.
    try {
      let retrieved = await axios({
        method: "GET",
        url: data.getBooks,
        headers: { authorization: "Bearer " + localStorage.getItem("token") }
      });
      
      if (retrieved.data.sucess) {
        //Si el valor existe en la respuesta indica que ocurrio un error
        this.setState({
          books: (
            <div className="justify-content-center">
              <h5> Access Denied, You can not perform this action </h5>
            </div>
          )
        });
      } else {
        //Desplegar la lista
        let books = retrieved.data;
        console.log("Los libros son: " + books);
        this.setState({
          books: books,
          isLoaded: true
        });
      }
    }
    catch (err) {
      console.log("Error: ", err);
      this.setState({
        books: (
          <div className="justify-content-center">
            <h5> Access Denied, You can not perform this action </h5>
            <h5> No token authetication provided, please log in</h5>
          </div>
        ),
        isError: true
      });
    }    
  };

  render() {
    const { isLoaded, isError } = this.state;
    return (
      <div className="container-fluid">
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark navconfig">
          <h5 className="navbar-brand">Books</h5>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <button className="nav-item nav-link navbutton" onClick={this.changeHome}>
                Home <span className="sr-only">(current)</span>
              </button>              
              <button className="nav-item nav-link navbutton" onClick={this.changeCuenta}>
                Mi Cuenta
              </button>
            </div>
          </div>
          <div>
            <button className="btn btn-danger" onClick={this.logOut}>
              Log Out
            </button>
          </div>
        </nav>
        {isLoaded
          ? this.state.books.map((book, i) => <Book key={i} value={book} />)
          : null}
        {isError ? this.state.books : null}
      </div>
    );
  }
}
