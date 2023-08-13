import {app, ServerStart} from './src/Server/index';
import Connection from './src/Database/index';

const Connect = new Connection()
ServerStart(Connect);
