var express = require('express');
var middleware = require("../auth/middleware.js");
var operations = require("../src/cost-ops");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Holi');
});

router.post('/addcost', middleware.checkToken, operations.addCost);
router.get('/getallcost', middleware.checkToken, operations.getAllCost);
router.get('/getcostcategory', middleware.checkToken, operations.getAllCostCategory);
router.get('/getcosttime', middleware.checkToken, operations.getCostTime);
router.get('/getcosttimecategory', middleware.checkToken, operations.getCostTimeCategory);

module.exports = router;