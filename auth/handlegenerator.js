let jwt = require("jsonwebtoken");
let config = require("./config");
const mongo = require("../mongo/mongo.js");

// Clase encargada de la creación del token
class HandlerGenerator {
  async login(req, res) {
    try {
      // Extrae el usuario y la contraseña especificados en el cuerpo de la solicitud
      let username = req.body.username;
      let password = req.body.password;      

      // Este usuario y contraseña, en un ambiente real, deben ser traidos de la BD
      let userData = await mongo.loginUser(username, password);      
      let mockedUsername = userData.username;
      let mockedPassword = userData.password;
      let userRole = userData.role;

      // Si se especifico un usuario y contraseña, proceda con la validación
      // de lo contrario, un mensaje de error es retornado
      if (username && password) {
        // Si los usuarios y las contraseñas coinciden, proceda con la generación del token
        // de lo contrario, un mensaje de error es retornado
        if (
          username === mockedUsername &&
          mongo.digest(password) === mockedPassword
        ) {

          // Se genera un nuevo token para el nombre de usuario el cuál expira en 24 horas
          let token = jwt.sign({ username: username, role: userRole}, config.secret, {
            expiresIn: "24h" //Pone el token a expirar en un dia.
          });         

          // Retorna el token el cuál debe ser usado durante las siguientes solicitudes
          res.json({
            success: true,
            message: "Authentication successful!",
            token: token            
          });
        } else {
          // El error 403 corresponde a Forbidden (Prohibido) de acuerdo al estándar HTTP
          res.status(403).send({
            success: false,
            message: "Incorrect username or password"
          });
        }
      } else {
        // El error 400 corresponde a Bad Request de acuerdo al estándar HTTP
        res.status(400).send({
          success: false,
          message: "Authentication failed! Please check the request"
        });
      }
    } catch (err) {
      console.log("El error es:", err);
      if (err["code"] !== undefined) {
        res.status(err["code"]).send(err);
      }
      else {
        res.status(500).send(`Error fatal: ${err}`);
      }      
      console.trace();
    }
  }
  
  index(req, res) {
    // Retorna una respuesta exitosa con previa validación del token    
    res.json({
      decoded: req.decoded,
      success: true,
      message: "Index page"
    });
  }

  async createUser(req, res) {
    try {
      let message = await mongo.addUser(req);
      res.send(message);           
    }
    catch (err) {      
      if (err.code) {
        res.status(err.code).send(err); //Error por formato e información de la peticion.
      }
      else {
        res.status(500).send(err); //Error de servidor.
      }      
    }
  }
  
}

module.exports = HandlerGenerator;
