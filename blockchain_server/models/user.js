var mongoose = require('mongoose');
var bcrypt = require('bcrypt')
//User Schema
var UserSchema = mongoose.Schema({
    password:{
        type:String, required: true, bcrypt:true
    },
    email:{
        type:String
    },
    coin: {
      type: Number, default: 1000
    },
    verifyToken: {
        type:String
    },
    verifyExpires: {
        type:Date
    },
    verified: {
        type:Boolean
    }

})
var User = module.exports = mongoose.model('user',UserSchema);

module.exports.createUser = function(newUser,callback){
    bcrypt.hash(newUser.password, 10, function(err,hash){
        if(err) throw err;
        //set hashed pw
        newUser.password = hash;
        //Create user
        newUser.save(callback);
    });
}
module.exports.getUsers =function () {
    return new Promise(function(success,fail){
        User.find(function(err,data){
            if(err) return fail(err);
            return success(data);
        })
    })
}
