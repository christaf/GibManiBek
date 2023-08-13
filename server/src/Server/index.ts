import express from 'express'
import Connection from "../Database";
import config from "config"

const app = express();
const port = config.get("APP.PORT");

async function ServerStart(Connection: Connection | null) {
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    app.listen(port, () => {
        return console.log(`Serwer uruchomiony na porcie ${port}`);
    });

}

export {app, ServerStart};