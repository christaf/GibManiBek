import config from 'config';
import mysql2 from 'mysql2';
import insertionHandler from "./insert/insertionHandler";
import {Pool} from "mysql2/promise";

interface insertData {
    "table": string
    "data": Array<Array<[string, string]>>
}

interface selectData {
    "table": string
    "columns": Array<string>
    "all": boolean
    "data": Array<string>
    "where": Array<Array<[string, string]>>
}

interface updateData {
    "table": string
    "data": Array<string>
    "where": Array<Array<[string, string]>>
}

interface deleteData {
    "table": string
    "where": Array<Array<[string, string]>>
}

export default class Connection {
    public pool: mysql2.Pool
    public promisePool: Pool

    constructor() {
        const host: string = config.get("DATABASE.HOST");
        const database: string = config.get("DATABASE.DATABASE");
        const user: string = config.get("DATABASE.USER");
        const pass: string = config.get("DATABASE.PASS");

        const pool: mysql2.Pool = mysql2.createPool({
            host: host,
            user: user,
            password: pass,
            database: database,
            connectionLimit: 10, // Number of simultaneous connections
            waitForConnections: true, // Wait in the queue when the limit is reached
            queueLimit: 0 // No limit on the queue size
        })
        console.log("Connected")
        this.pool = pool;
        this.promisePool = pool.promise()
    }

    insertDataIntoDB(data: any): Promise<any> {
        return insertionHandler(this.promisePool, data)
    }
};