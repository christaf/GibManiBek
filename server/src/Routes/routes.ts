import passport from "passport";
import Connection from "../Database";

export default function (app: any) {
    app.post('/login', passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true,
    }));
    app.get('/', (req: any, res: any) => {
        res.send('Hello World!');
    });
    app.get('/contacts/:userId', async (req: any, res: any) => {
        try {
            const userId = req.params.userId;
            const connection = new Connection();
            const user = await connection.findUserByEmail(userId);
            res.send(user);
        } catch (error) {
            console.log(error);
        }
    });
    // app.get('/logout', (req, res) => {
    //     req.logout();
    //     res.redirect('/');
    // });
}

