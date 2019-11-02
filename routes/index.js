var express = require('express');
var router = express.Router();

var HandlerGenerator = require("../auth/handlegenerator.js");
var middleware = require("../auth/middleware.js");
var operations = require("../src/operations.js")

HandlerGenerator = new HandlerGenerator();

/* GET home page. */
router.get('/', middleware.checkToken, HandlerGenerator.index);
router.post('/login', HandlerGenerator.login);
router.post('/user', HandlerGenerator.createUser);
router.post('/addBook', middleware.checkToken, operations.addBook);
router.get('/getBooks', middleware.checkToken, operations.getAllBooks);
router.get('/getISBN', middleware.checkToken, operations.getBookByISBN);

module.exports = router;