var express = require('express');
var middleware = require("../auth/middleware.js");
var operations = require("../src/cost-ops");
var router = express.Router();

/* GET users listing. */

router.post('/addcost', middleware.checkToken, operations.addCost);
router.get('/getallcost', middleware.checkToken, operations.getAllCost);
router.post('/getcostcategory', middleware.checkToken, operations.getAllCostCategory);
router.post('/getcosttime', middleware.checkToken, operations.getCostTime);
router.post('/getcosttimecategory', middleware.checkToken, operations.getCostTimeCategory);

module.exports = router;