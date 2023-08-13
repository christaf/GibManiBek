import {app, ServerStart} from './src/Server';
import Connection from './src/Database/index';

const Connect = new Connection()
ServerStart(Connect).then(
    () => console.log("Server started")
);
