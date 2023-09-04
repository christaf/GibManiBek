import passport from "passport";
import Connection from "../Database";
import {getContacts} from "./contacts";

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
            const contacts = await getContacts(userId)
            res.json({userId, contacts});
        } catch (error) {
            console.log(error);
        }
    });
    // app.get('/logout', (req, res) => {
    //     req.logout();
    //     res.redirect('/');
    // });
}

