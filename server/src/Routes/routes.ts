import passport from "passport";
import express from "express";
import bodyParser from 'body-parser';
/*
export default function (app: any) {
    app.post('/login', (req,res,next) => {
        const { users } = req.body; // Destructure the user object from req.body
        //const { email, password } = users[0]; // Destructure email and password from the user object
        //const { email, password } = JSON.parse(users);

        const { email, password } = req.body.user[0];
        const user = users.find(u => u.email === email && u.password === password);

        console.error(JSON.parse(users));
        passport.authenticate('local', {
            successRedirect: '/dashboard',
            failureRedirect: '/login',
            failureFlash: true,
        })(req, res, next); // Continue with authentication
    });
    app.get('/', (req, res) => {
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

 */


export default function (app: any) {
    //const bodyParser = require('body-parser');
    //app.use(bodyParser.json());

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

        //const { email, password } = req.body.user[0];
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({error: 'Email and password are required'});
        }

        const user = users.find(u => u.email === email && u.password === password);

        console.error(email, password);

        if (!user) {
            return res.status(401).json({error: 'Invalid credentials'});
        }

        return res.status(200).json({message: 'Login successful', user: {id: user.id, email: user.email}});

        /*
        const { email, password } = req.body.user[0];

        const user = users.find(u => u.email === email && u.password === password);
        console.error(user?.email);
        console.log(user?.email);

 */


    });
}