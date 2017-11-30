var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')
var authMiddleware = require('../middlewares/authenticate')
/* AUTH API */
router.post('/register', function(req, res, next) {
    console.log('adb',req.body)
    userController.register(req,res)
});
router.get('/verify/:token',function (req,res) {
    userController.verify(req,res)
})
router.post('/login', function (req,res) {
    userController.login(req,res)
})

/* USER API */
router.get('/', authMiddleware.authenticate, authMiddleware.verifyCheck, function (req,res) {
    return res.status(201).json(req.currentUser)
})
router.get('/transaction/send', authMiddleware.authenticate, authMiddleware.verifyCheck, function (req,res) {
    userController.getSendingTransactionOfUser(req,res)
})
router.get('/transaction/receive', authMiddleware.authenticate, authMiddleware.verifyCheck, function (req,res) {
    userController.getReceivingTransactionOfUser(req,res)
})
router.post('/', authMiddleware.authenticate, authMiddleware.verifyCheck, function (req, res) {
    userController.sendCoin(req,res)
})

module.exports = router;
