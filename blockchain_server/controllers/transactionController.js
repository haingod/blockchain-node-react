var Transaction = require('../models/transaction')

module.exports.getTransactionList = function (req,res) {
    Transaction.find({}, function (err, list) {
        if(!list) return res.status(400).json({err:'tranaction list not found'})
        else {
            return res.json(list)
        }
    })
}