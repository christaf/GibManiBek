import passport from 'passport';
import LocalStrategy from 'passport-local';
import Connection from "../Database";

export function configurePassport(app: any) {
    const Connect = Connection.getInstance()

    passport.use(new LocalStrategy.Strategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
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

    passport.serializeUser((user: any, done: any) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id: number, done) => {
        try {
            const user = await Connect.findUserBy("id", id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });
}
