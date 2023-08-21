import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from "../Models/user/user";
import Connection from "../Database";
import {app} from "../Server";
import session from "express-session";

export function configurePassport() {
    const Connect = Connection.getInstance()
    app.use(session({
        secret: 'your-secret-key', // Replace with a strong secret key
        resave: false,
        saveUninitialized: true
    }));
    passport.use(new LocalStrategy.Strategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
        try {
            const user = await Connect.findUserByEmail(email);
            if (!user) {
                return done(null, false);
            }
            const isValid = await user.isValidPassword(password);
            console.log(isValid)
            if (!isValid) {
                return done(null, false);
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }));

    passport.serializeUser((user: User, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const connection = new Connection();
            const user = await connection.findUserByEmail(id.toString());
            done(null, user);
        } catch (error) {
            done(error);
        }
    });
}
