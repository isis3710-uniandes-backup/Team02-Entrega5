/**
 * Modulo de conexion a MongoDB.
 */

const MongoClient = require("mongodb").MongoClient;
const forge = require("node-forge");
const url = "mongodb+srv://user:testuser@personal-jkqvg.mongodb.net/test?retryWrites=true&w=majority";
const cliente = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const database = "data";
const mongo_collection = "user";

//Permite crear un digest para una clave en especifico.
// pData es la cadena de texto de la clave.

const generateDigest = pData => {
  let md = forge.md.sha1.create();
  md.update(pData);
  return md.digest().toHex(); //Retorna la cadena de texto en Hexa de la clave.
};

const addUser = async req => {
  return new Promise(async (resolve, reject) => {
    try {
      let notify = "";
      let users = await countDocuments({ username: req.body.username });
      if (users !== 0)
        notify += "Username is already in use, please choose another \n";
      let email = await countDocuments({ email: req.body.email });
      if (email !== 0)
        notify +=
          "Email is already in use with another account, please enter another \n";

      if (notify.length !== 0) {
        reject({
          code: 400,
          message: notify
        });
        return;
      }
    } catch (err) {
      reject(err);
      return;
    }

    cliente.connect(err => {
      if (err) reject(err);
      db = cliente.db(database);
      const colleccion = db.collection(mongo_collection); //Nombre del documento donde guardaremos la informacion    let body = {}

      //Atención: Ojo que los nombres de los atributos coincida tanto en el back como en el front
      /**
       * ! Los nombres son:
       * ! username: Nombre de usuario.
       * ! fullname: Nombres y Apellidos del usuario.
       * ! email: Correo del usuario.
       * ! password: Clave del usuario.
       * ! role: Rol del usuario.
       */

      colleccion.insertOne(req.body, (error, resultado) => {
        if (error) {
          //Informar errores al usuario
          console.log(error);
          mensaje = {
            mensaje:
              "Se presentaron errores guardando el valor en la base de datos"
          };
          reject(mensaje);
        }
        resolve({ mensaje: "Usuario agregado satisfactoriamente" });
        return cliente.close();
      });
    });
  });
};

const addBook = book => {
  return new Promise((resolve, reject) => {
    cliente.connect(err => {
      if (err) reject(err);
      db = cliente.db(database);
      const colleccion = db.collection("books"); //Documento en el cual persistir el registro.
      colleccion.insertOne(book, (error, resultado) => {
        if (error) {
          //Informar errores al usuario
          console.log(error);
          mensaje = {
            mensaje:
              "Se presentaron errores guardando el valor en la base de datos"
          };
          reject(mensaje);
        }
        resolve({ mensaje: "Libro agregado satisfactoriamente" });
      });
    });
  });
};

const getAllBooks = () => {
  return new Promise((resolve, reject) => {
    cliente.connect(err => {
      if (err) return console.log(err);
      db = cliente.db(database);
      const cursor = db.collection("books").find();
      cursor.toArray((err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  });
};

const getBookByISBN = isbn => {
  return new Promise((resolve, reject) => {
    cliente.connect(err => {
      if (err) return console.log(err);
      db = cliente.db(database);
      db.collection("books").findOne({ isbn: isbn }, function(err, result) {
        if (err) {
          reject(`Lo sentimos se presento el siguiente error: ${err}`);
        } else if (result !== null || result !== undefined) {
          //Si la consulta arrojo algun resultado y no es vacia
          resolve(result);
        } else {
          reject(
            `Apreciado usuario, el libro con ISBN ${isbn} no se encuentra registrado`
          );
        }
      });
    });
  });
};

const loginUser = (name, pass) => {
  return new Promise((resolve, reject) => {
    cliente.connect(err => {
      if (err) return console.log(err);
      db = cliente.db(database);
      let query = { username: name, password: generateDigest(pass) };
      db.collection(mongo_collection).findOne(query, function(err, result) {
        if (err) {
          //Error en la consulta.
          reject({ code: 500, message: err });
        } else if (result !== null && result !== undefined) {
          //Si la consulta arrojo algun resultado y no es vacia
          resolve(result);
        } else {
          reject({ code: 404, message: "El usuario no existe" });
        }
      });
    });
  });
};

const countDocuments = async query => {
  return new Promise((resolve, reject) => {
    cliente.connect(err => {
      if (err) return console.log(err);
      db = cliente.db(database);
      db.collection(mongo_collection).countDocuments(query, function(
        err,
        result
      ) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  });
};

module.exports = {
  addUser: addUser,
  loginUser: loginUser,
  digest: generateDigest,
  addBook: addBook,
  getAllBooks: getAllBooks,
  getBookByISBN: getBookByISBN
};
