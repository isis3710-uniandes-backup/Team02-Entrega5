/**
 * Operaciones del nivel de persistencia para el recurso gasto.
 */

const MongoClient = require("mongodb").MongoClient;
const url = "mongodb+srv://user:testuser@personal-jkqvg.mongodb.net/test?retryWrites=true&w=majority";
const cliente = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
const database = "data";
const mongo_collection = "cost";

//? Permite agregar un gasto al usuario
//! @pre: Se debe seguir muy bien el formato del JSON.
//* @param: cost: Datos del gasto segun el formato JSON definido, incluyen el nombre de usuario.

const addCost = (cost) => {
    return new Promise((resolve, reject) => {        
        cliente.connect(err => {
            if (err) {console.log(err); reject(err)}
            db = cliente.db(database);
            db.collection(mongo_collection).insertOne(cost, (err, result) => {
                if (err) reject(err);
                else {
                    resolve({message: `The cost was succesfully added to the user ${cost.username}`});
                }
            });
        });
    });
}

//? Permite obtener todos los gastos de un determinado usuario.
//* @param: username: Nombre del usuario a consultar.

const getAllCost = (username) => {
    return new Promise((resolve, reject) => {
        cliente.connect(err => {
            if (err) {console.log(err); reject(err)}
            db = cliente.db(database);
            db.collection(mongo_collection).find({username: username}).toArray((err, result) => {
                if (err) reject(err);
                else {
                    resolve(result);
                }
            });
        });
    });
};

//? Permite obtener todos los gastos de un determinado usuario.
//* @param: username: Nombre del usuario a consultar.

const getAllCostCategory = (username, category) => {
    return new Promise((resolve, reject) => {
        cliente.connect(err => {
            if (err) {console.log(err); reject(err)}
            db = cliente.db(database);
            db.collection(mongo_collection).find({$and: [{username: username}, {category: category}]}).toArray((err, result) => {
                if (err) reject(err);
                else {
                    resolve(result);
                }
            });
        });
    });
};

//? Permite obtener todos los gastos para un usuario realizados en cierta ventana de tiempo
//! @pre: Tanto la fecha inicial como la fecha final deben seguir obligatoriamente el formate ISODate
//! Por ejemplo: 2019-02-11T05:00:00.000+00:00
//* @param: inicialTime: Limite inferior de la ventana de tiempo
//* @param: finalTime: Limite superior de la ventana de tiempo.

const getCostTime = async (username, inicialTime, finalTime) => {
    return new Promise((resolve, reject) => {
        let iT = new Date(inicialTime);
        let fT = new Date(finalTime);
        //console.log("Tiempo Inicial", iT);
        //console.log("Tiempo Final", fT);
        //console.log("Prueba", new Date('2/11/2019'));
        cliente.connect(err => {
            if (err) {console.log(err); reject(err)}
            db = cliente.db(database);
            let query = {
                $and: [
                    {username: username},
                    {date: {
                        $gte: iT,
                        $lt: fT,
                    }}
                ]
            };
            db.collection(mongo_collection).find(query).toArray((err, result) => {
                if (err) reject(err);
                else {
                    resolve(result);
                }
            });
        });
    });
};

//? Permite obtener todos los gastos para un usuario de una categoria realizados en cierta ventana de tiempo
//! @pre: Tanto la fecha inicial como la fecha final deben seguir obligatoriamente el formate ISODate
//! Por ejemplo: 2019-02-11T05:00:00.000+00:00
//* @param: inicialTime: Limite inferior de la ventana de tiempo
//* @param: finalTime: Limite superior de la ventana de tiempo.

const getCostTimeCategory = async (username, category, inicialTime, finalTime) => {
    return new Promise((resolve, reject) => {
        let iT = new Date(inicialTime);
        let fT = new Date(finalTime);
        //console.log("Tiempo Inicial", iT);
        //console.log("Tiempo Final", fT);        
        cliente.connect(err => {
            if (err) {console.log(err); reject(err)}
            db = cliente.db(database);
            let query = {
                $and: [
                    {username: username},
                    {category: category},
                    {date: {
                        $gte: iT,
                        $lt: fT,
                    }}
                ]
            };
            db.collection(mongo_collection).find(query).toArray((err, result) => {
                if (err) reject(err);
                else {
                    resolve(result);
                }
            });
        });
    });
};

module.exports = {
    addCost: addCost,
    getAllCost: getAllCost,
    getAllCostCategory: getAllCostCategory,
    getCostTime: getCostTime,
    getCostTimeCategory: getCostTimeCategory
}