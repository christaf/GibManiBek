import User from "../Models/user/user";
import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";
import Connection from "../Database";

passport.use(new LocalStrategy(
    {usernameField: 'email'},
    async function (email: string, password, done) {
        try {
            const user = await Connection.findUserByEmail(email);
            if (!user) {
                return done(null, false, {message: 'Incorrect email.'});
            }
            if (!user.isValidPassword(password)) {
                return done(null, false, {message: 'Incorrect password.'});
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }));