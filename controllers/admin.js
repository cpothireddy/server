var mongoose = require('mongoose');
User = mongoose.model('User');
//var logger = require("../shared/lib/logger");





exports.all = function (req, res) {
    

console.log(req.session);

    var perPage = parseInt(req.params.displayperpage);
    if (req.params.pageno != 0) {
        page = (req.params.pageno) - 1;
    }
    else {
        page = 0;
    }

    User
        .find({})
        .limit(perPage)
        .skip(perPage * page)
        .exec(function (err, users) {
            User.count({}).exec(function (err, count) {
                if (err) {
                    res.failure(err);
                } else {
                    var result = {
                        users: users,
                        count: count
                    };
                    res.send(result);
                }
            });


        });

}


exports.logout = function (req, res) {


    req.logout();
    res.json({ "message": "logout done" });
}



exports.create = function (req, res) {

    var theUser = new User(req.body);
    theUser.save(function (err) {

        if (err) {
            console.log(err);
        } else {
            res.send(theUser);
        }
    });
};
exports.signin = function (req, res, next, passport) {
    //const timer = logger.startTimer();
    passport.authenticate('local', function (err, admin, info) {
        if (err) {
            return next(err);
        }
        if (!admin) {
            console.log(info.message);
        }
        req.logIn(admin, function (err) {
            if (err) {
                return next(err);
            }
            res.send(admin);

        });
    })(req, res, next);
    //timer.done("Login time");
}