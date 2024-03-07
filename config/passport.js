var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
User = mongoose.model('User');

module.exports = function(passport) {
//Serialize sessions
passport.serializeUser(function (user, done) {
    //console.log('serialize user???');
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findOne({
        _id: id
    }, function (err, user) {
        if (user._id) user.userId = user._id;
        done(err, user);
    });
});


//Use local strategy
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
        function (username, password, done) {
            User.findOne({ username: username })
                .then(user => {
                    if (!user) {
                        return done(null, false, {
                            message: 'Unknown user'
                        });
                    }
                    if (!user.authenticate(password)) {
                        return done(null, false, {
                            message: 'Invalid passwordd'
                        });
                    }
                    return done(null, user);
                })
                .catch(err => {
                    return done(err);
                });
        }
    ));

}