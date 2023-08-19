import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from "../Models/user/user";
import Connection from "../Database";

export function configurePassport() {
    const Connect = Connection.getInstance()
    passport.use(new LocalStrategy.Strategy({ usernameField: 'email' }, async (email, password, done) => {
        try {
            const user = await Connect.findUserByEmail(email);
            if (!user) {
                return done(null, false);
            }
            const isValid = await user.isValidPassword(password);
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
