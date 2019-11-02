/**
 * Contiene las operaciones que pueden realizar los usuarios de acuerdo a su token.
 * Ambientaremos las operaciones en un registro de datos de libros.
 */

const mongo = require("../mongo/mongo.js");

//Permite agregar un libro al sistema
//! Solo el usuario administrador puede ejecutar la operación

const addBook = async (req, res) => {
  let role = req.decoded.role; //Accede al rol de quien ejecuta la operación despues de autenticarse con el token.
  if (role !== "admin") {
    //Verifica el rol.
    res.status(403).send({
      success: false,
      message:
        "Access Denied. You don´t have the correct permissions to perform this action."
    });
  }
  //Uso de las palablas clave async/await.
  try {
    let message = await mongo.addBook(req.body);
    res.send(message);
  } catch (err) {
    console.log("El error es: ", err);
    res.status(500).send(err);
    console.trace();
  }
};

//Permite a los usuarios administrador o bibliotecario acceder a todo el contenido de todos los libros.
const getAllBooks = (req, res) => {
  let role = req.decoded.role; //Accede al rol de quien ejecuta la operación despues de autenticarse con el token.
  if (role !== "admin" && role !== "librarian") {
    //Verifica el rol.
    res.status(403).send({
      success: false,
      message:
        "Access Denied. You don´t have the correct permissions to perform this action."
    });
  }

  //Uso del formato de promesa.
  mongo
    .getAllBooks()
    .then(books => res.send(books))
    .catch(err => res.status(500).send(err));
};

//Permite a un usuario obtener la información de un libro de acuerdo a sus permisos.
//? Para los usuarios administrador permite obtener la información basica al igual que las existencias en bodega
//? y el precio de compra a los proveedores
//* Para el usuario invitado solo le entrega la información basica.

const getBookByISBN = (req, res) => {
  let isbn = req.body.isbn; //Obtiene el ISBN del cuerpo de la petición.
  let role = req.decoded.role; //Obtiene el rol.  
  console.log(`El ISBN es ${isbn} y su tipo es: ${typeof isbn}`);
  
  mongo
    .getBookByISBN(isbn)
    .then(book => {
      console.log("El resultado de la promesa es: ", book);      
      if (role === "admin" || role === "librarian") {
        res.send(book); //Envia la información completa de las existencias.
      } else {
        //Para los demas usuarios solo se les otorga la información basica.
        delete book.providerCost;
        delete book.existences;
        res.send(book);
      }
    })
    .catch(err => res.status(500).send(err));
};

module.exports = {
  addBook: addBook,
  getAllBooks: getAllBooks,
  getBookByISBN: getBookByISBN
};
