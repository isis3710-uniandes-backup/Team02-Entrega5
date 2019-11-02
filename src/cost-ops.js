/**
 * Operaciones CRUD relacionadas con el recurso gasto.
 */

const mongo = require('../mongo/cost-db');

const addCost = async (req, res) => {
    let username = req.decoded.username; //Esto se obtiene al verificar el token    
    req.body.username = username; //Insertar el usuario.
    req.body.date = new Date(req.body.date); //Poner el formato adecuado para la fecha
    try {
        let message = await mongo.addCost(req.body);
        res.send(message);
    }
    catch (err) {        
        res.status(500).send(err); //Error del servidor.
    }
};

const getAllCost = async (req, res) => {
    let username = req.decoded.username;
    try{
        let result = await mongo.getAllCost(username);
        res.send(result)
    }
    catch (err) {
        res.status(500).send(err); //Error del servidor.
    }
};

const getAllCostCategory = async (req, res) => {
    let username = req.decoded.username;
    let category = req.body.category;    
    try {
        let result = await mongo.getAllCostCategory(username, category);
        res.send(result)
    }
    catch (err) {
        res.status(500).send(err); //Error del servidor.
    }
};

const getCostTime = async (req, res) => {
    let username = req.decoded.username;
    let inicialTime = req.body.inicialTime;
    let finalTime = req.body.finalTime;
    try { 
        let result = await mongo.getCostTime(username, inicialTime, finalTime);
        res.send(result);
    }
    catch (err) {
        res.status(500).send(err); //Error del servidor.
    }
};

const getCostTimeCategory = async (req, res) => {
    let username = req.decoded.username;
    let category = req.body.category;
    let inicialTime = req.body.inicialTime;
    let finalTime = req.body.finalTime;

    try { 
        let result = await mongo.getCostTimeCategory(username, category, inicialTime, finalTime);
        res.send(result);
    }
    catch (err) {
        res.status(500).send(err); //Error del servidor.
    }
};

module.exports = {
    addCost: addCost,
    getAllCost: getAllCost,
    getAllCostCategory: getAllCostCategory,
    getCostTime: getCostTime,
    getCostTimeCategory: getCostTimeCategory
}