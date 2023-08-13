import express from 'express'
import Connection from "../Database";

const app = express();

async function ServerStart(Connection: Connection | null) {
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
}

export {app, ServerStart};