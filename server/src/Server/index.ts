import express from 'express'
import config from "config"
import configureRoutes from "../Routes/routes";
import passport from "passport";
import session from "express-session";
import {configurePassport} from "../Passport/configurePassport";
import cors from "cors";
import flash from "connect-flash";

//
import googleAuth from "../Routes/Auth/googleAuth";

const app = express();
const port = config.get("APP.PORT");

async function ServerStart() {

    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(cors());
    app.use(flash());
    app.use(session({
        secret: config.get("APP.SESSION.SECRET"),
        resave: false,
        saveUninitialized: true
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    configureRoutes(app);
    //
    googleAuth(app);

    configurePassport();

    app.listen(port, () => {
        return console.log(`Serwer uruchomiony na porcie ${port}`);
    });

}

export {app, ServerStart};