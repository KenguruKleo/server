import passport from 'passport';
import User from '../models/user';
import config from '../config';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

// Sutup options for JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    //See if the user ID in the payload exist in our database
    //If it does, call 'done' with that other
    //otherwise, call done without a user object
    User.findById( payload.sub, function (err, user) {
        if (err) { return dine(err, false) }

        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
});

//Tell passport to use this strategy
passport.use(jwtLogin);
