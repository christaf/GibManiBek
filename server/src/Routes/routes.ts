import passport from "passport";

export default function (app: any) {
    app.post('/login', (req,res,next) => {
        const { users } = req.body; // Destructure the user object from req.body
        const { email, password } = users[0]; // Destructure email and password from the user object

        passport.authenticate('local', {
            successRedirect: '/dashboard',
            failureRedirect: '/login',
            failureFlash: true,
        })(req, res, next); // Continue with authentication
    });
    app.get('/', (req, res) => {
        res.send('Hello World!');
    });
    // app.get('/logout', (req, res) => {
    //     req.logout();
    //     res.redirect('/');
    // });
}

