import {app, ServerStart} from './src/Server';

ServerStart().then(
    () => console.log("Server started")
);
