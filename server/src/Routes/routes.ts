import passport from "passport";
import Connection from "../Database";
import {getContacts} from "./contacts";

export default function (app: any) {
    app.post('/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true,
    }));
    // app.post('/login', (req: any, res: any) => {
    //     req.session.userId = '2'; // Przykładowy identyfikator zalogowanego użytkownika
    //     res.send('Zalogowano');
    // });

    app.get('/', (req: any, res: any) => {
        res.send('Hello World!');
    });
    app.get('/contacts', async (req: any, res: any) => {
        try {
            const userId = req.session.passport.user
            // const userId = req.params.userId;
            const contacts = await getContacts(userId)
            console.log(contacts)
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

