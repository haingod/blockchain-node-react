var jwt = require('jsonwebtoken')
var User = require('../models/user');
module.exports.authenticate = (req,res,next)=>{
    const authorizationHeader = req.headers['authorization']
    let token;
    if(authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    if(token) {
       jwt.verify(token, process.env.JWT_TOKEN, (err, decoded)=>{
           if(err) {
               return res.status(401).json({
                   error: 'Failed to authenticate'
               })
           } else {
               User.findById(decoded.id, function (err, user) {
                   if(!user) {
                       return res.status(404).json({error: 'No user found'})
                   }
                   req.currentUser = user;
                   next();
               })
           }
       })
    } else {
        return res.status(403).json({
            error: 'No token provided'
        })
    }
}
module.exports.verifyCheck = (req,res,next) => {
    if(req.currentUser.verified) next();
    else {
        return res.status(401).json({
            error: 'account not verified'
        })
    }
}