var express = require('express');
var router = express.Router();
var transactionController = require('../controllers/transactionController')
var authMiddleware = require('../middlewares/authenticate')

/* USER API */
router.get('/', authMiddleware.authenticate, authMiddleware.verifyCheck, function (req,res) {
   transactionController.getTransactionList(req,res);
})
module.exports = router;
