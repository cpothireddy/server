var mongoose = require('mongoose');
User = mongoose.model('User');

//var logger = require("../shared/lib/logger");

const { validationResult } = require("express-validator");





var jwt = require("jsonwebtoken");
var config = require("../config/config");
exports.signin = function(req, res, next, passport){
    //const timer = logger.startTimer();
    
    passport.authenticate('local', function (err, user, info) {
        console.log('req.body', JSON.stringify(user));
        if (err) {
            console.log('err 1', JSON.stringify(err));
            return next(err);
        }
        if (!user) {
            console.log('err 2', JSON.stringify(info));
            console.log(info.message);
        }
        req.logIn(user, function (err) {
            if (err) {
                console.log('err 3', JSON.stringify(err));
                return next(err);
            }
            req.theUser = user;
            var token = jwt.sign({user},config.local.secret);
            res.status(200).send({auth:true,token:token,user:user})
            //res.send(user);

        });
    })(req, res, next);
    // timer.done("Login time");
}

exports.create = function (req, res) {
    console.log('req.body', JSON.stringify(req.body));
    try {
        const errors = validationResult(req);
        // if there is error then return Error
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }
        // save data to DB
        var theUser = new User(req.body);
        theUser.save()
            .then(user => {
                res.send("user saved to database");
            })
            .catch(err => {
                res.status(400).send("unable to save to database");
            });
    } catch (err) {
        next(err);
    }

};

exports.all = function (req, res) {
    User.find({}).exec(function (err, users) {
        if (err) {
            res.failure(err)
        } else {
            res.json(users);
        }
    })
}

exports.show = function(req, res) {
    User.findOne({ _id: req.params.id }).exec(function (err, user) {
        if (err) {
            res.failure(err)
        } else {
            res.json(user);
        }
    })
}

exports.destroy = function (req, res) {
    var sid = req.params.id;
    User.findById(sid, function (err, doc) {
        doc.remove(function () {
            res.json({ message: "deleted" });
        })
    })
}

exports.update = function (req, res) {
    var sid = req.body._id;
    User.findById(sid, function (err, doc) {
        doc.fname = req.body.fname;
        doc.lname = req.body.lname;
        doc.save(function () {
            res.json(doc);
        })
    })
}