var mongoose = require('mongoose');
//User Schema
var TransactionSchema = mongoose.Schema({
    time:{ type: Date, default: Date.now },
    sender: {type: String},
    receiver: {type: String},
    description: {type: String},
    amount: {type: Number}
})
var User = module.exports = mongoose.model('transaction',TransactionSchema);


module.exports.getAll =function () {
    return new Promise(function(success,fail){
        User.find(function(err,data){
            if(err) return fail(err);
            return success(data);
        })
    })
}

module.exports.getBySender = function (idSender) {
    return new Promise(function(success,fail){
        User.find({sender: idSender},function(err,data){
            if(err) return fail(err);
            return success(data);
        })
    })
}
