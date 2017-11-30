var passport = require('passport');
var User = require('../models/user');
var Transaction = require('../models/transaction')
var bcrypt = require('bcrypt');
var async = require('async');
var randtoken = require('rand-token');
var nodemailer = require('nodemailer');
var LocalStrategy = require('passport-local').Strategy;
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'iBananath2014@gmail.com',
        pass: 'adminibanana'
    }
});
var jwt = require('jsonwebtoken')

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id).then(function (user) {
        done(null, user);
    }).catch(function (err) {
        console.log(err);
    })
});

passport.use(new LocalStrategy({
        usernameField: 'id',
        passwordField: 'password',
        session: false
    },
    function (id,password,done) {
        console.log('passport :', id, password)
        User.findById(id).then(function (user,err) {

            if(user){
                bcrypt.compare(password, user.password, function (err,result) {
                    if (err) { return done(err); }
                    if(!result) {
                        return done(null, false, { message: 'Incorrect username and password' });
                    }
                    return done(null, user);
                })
            }else{
                return done(null, false, { message: 'Incorrect username and password' });
            }



        }).catch(function (err) {
            return done(err);
        })
    }
))


module.exports.verify = function(req,res){
    User.findOne({ verifyToken: req.params.token, verifyExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
            return res.status(404).json({
                error: "Verify token is invalid or has expired."
            });
        }
        else{
            user.verifyToken = undefined;
            user.verifyExpires = undefined;
            user.verified = true;
            user.save(function(err) {
                res.json("email is verified")
            });
        }
    });
}
module.exports.register = function(req,res,next){
    var email = req.body.email;
    var password = req.body.password;
    var password2 = req.body.password2;
    console.log(req.body)
    //form validation
    req.checkBody('email','email field is required').notEmpty();
    req.checkBody('email','email not valid').isEmail();
    req.checkBody('password','password field is required').notEmpty();
    req.checkBody('password', 'Password must be at least 6 characters long').len(6);
    req.checkBody('password2','password do not match').equals(req.body.password);
    var errors = req.validationErrors();
    if(errors){
        res.send(errors)
    }
    else{
        User.findOne({ email: req.body.email }, function(err, user) {
            if (user) {
                res.send({
                    message:'Account with that email address already exists.',
                    errors:errors
                });
            }
            else{
                User.findOne({ email: req.body.email }, function(err, user) {
                    if (user) {
                        console.log('That username exists');
                        res.send({
                            message:'That username is already taken.',
                            errors:errors
                        });
                    }
                    else{
                        var suid = require('rand-token').suid;
                        var token = suid(16);
                        var newUser = new User({
                            email:email,
                            password:password,
                            verifyToken: token,
                            verifyExpires: Date.now() + 3600000, // 1 hour,
                            verified: false
                        });
                        //Create user
                        User.createUser(newUser,function(err,user){
                            if(err) throw err;
                            const link= 'http://localhost:3001/user/verify/' + token;
                            var mailOptions = {
                                from: 'iBananath2014@gmail.com',
                                to: email,
                                subject: 'Please confirm your Email account',
                                html : 'Your wallet id is '+user._id+',<br> Please Click on the link to verify your email.<br><a href="'+link+'">Click here to verify</a>'
                            }
                            transporter.sendMail(mailOptions, function(error, response){
                                if(error){
                                    console.log(error);
                                    res.send({
                                        message:'Cannot send message to your email',
                                        title: 'Register - iBanana'
                                    });
                                }
                                else{
                                    console.log("Message sent to: " + email);
                                    res.send({
                                        success:'Link confirm account sent to '+email+'. Please check inbox!',
                                        title: 'Register - iBanana'
                                    });
                                }
                            });
                        });
                    }
                });
            }
        });
    }
}
module.exports.login =  function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (!user) return res.status(404).json({error:'Incorrect Credential'})
        else {
            if(user.verified) {
                const token = jwt.sign({
                    id: user._id
                }, process.env.JWT_TOKEN)
                return res.json(token);
            }
            else {
                return res.status(401).json({error:'Account Not Verified'})
            }
        }
    })(req, res, next);
}
module.exports.sendCoin = function (req,res,next) {
    if(req.body.address === (req.currentUser._id+'')) {
        return res.status(400).json({error: 'You can not send coin to yourself'})
    } else {
        User.findById(req.body.address, function (err, user) {
            if(!user) {
                return res.status(404).json({error: 'No receiver found'})
            }
            req.body.amount = parseFloat(req.body.amount);
            if(req.currentUser.coin >= req.body.amount) {
                req.currentUser.coin -= req.body.amount;
                req.currentUser.save(function (err1, updatedCurrentUser) {
                    user.coin += req.body.amount;
                    user.save(function (err, updatedUser) {
                        if (err) return res.status(500).json({error: 'Cannot send coin. Please retry later'})
                        const transaction = new Transaction({
                            sender: req.currentUser._id,
                            receiver: updatedUser._id,
                            amount: req.body.amount,
                            description: req.body.description
                        })
                        transaction.save(function (err) {
                            if (err) return res.status(500).json({error: 'Cannot send coin. Please retry later'})
                            return res.status(201).json(transaction)
                        });
                    });
                })
            } else {
                return res.status(500).json({error: 'You dont have enough sending coin'})
            }
        })
    }
}
module.exports.getSendingTransactionOfUser = function (req,res) {
    Transaction.find({sender: req.currentUser._id}, function (err, list) {
        if(!list) return res.status(400).json({err:'tranaction list not found'})
        else {
            return res.json(list)
        }
    })
}
module.exports.getReceivingTransactionOfUser = function (req,res) {
    Transaction.find({receiver: req.currentUser._id}, function (err, list) {
        if(!list) return res.status(400).json({err:'tranaction list not found'})
        else {
            return res.json(list)
        }
    })
}