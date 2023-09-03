
import express from "express";
import cors from "cors";
import {Strategy as GoogleStrategy} from "passport-google-oidc";
import passport from "passport";

export default function (app: any){

    const router = express.Router();

    app.use(cors());

    app.post('/login2', (req: express.Request, res: express.Response) => {
        console.log('GIT LOGIN!');
        console.error('EEEEEEEEEEEEEEEEEEEEEEE!');
        router.get('/login/federated/google', passport.authenticate('google'));

        passport.use(new GoogleStrategy({
            clientID: "846459977740-uviel48gfvbk2ifofav8crot4qe4d9k6.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: '/oauth2/redirect/google',
            scope: [ 'profile' ]
        }))

    });
}

//const router = express.Router();

/*

import bodyParser from "body-parser";

export default function (app: any){
    app.use(bodyParser.json());

// Simulated user data (replace this with a real database)
    const users = [
        {
            id: 1,
            email: 'user@example.com',
            password: 'password123'
        }
    ];

// Endpoint to handle login requests
    app.post('/login', (req, res) => {
        console.log(req.body.user);

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = users.find(u => u.email === email && u.password === password);

        console.error(email, password);

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        return res.status(200).json({ message: 'Login successful', user: { id: user.id, email: user.email } });
    });
}

 */
