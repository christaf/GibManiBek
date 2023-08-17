import config from 'config';
import mysql2 from 'mysql2';
import {Pool} from "mysql2/promise";
import insertionHandler from "./insert/insertionHandler";
import selectionHandler from "./select/selectionHandler";
import deleteHandler from "./delete/deleteHandler";
import updateHandler from "./update/updateHandler";
import User from "../Models/user/user";

interface insertData {
    "table": string
    "data": Array<Array<[string, string]>>
}

interface selectData {
    "table": string
    "columns": Array<string>
    "conditions": Array<string>
    "all": boolean
    "like": boolean
}

interface updateData {
    table: string;
    data: Array<Array<[string, string]>>;
    conditions: Array<Array<[string, string]>>;
}

interface deleteData {
    "table": string
    "conditions": Array<[string, string]>
}
export default class Connection {

    private static instance: Connection | null = null;
    public static getInstance(): Connection {
        if (!Connection.instance) {
            Connection.instance = new Connection();
        }
        return Connection.instance;
    }
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

    async insertDataIntoDB(data: insertData): Promise<any> {
        return insertionHandler(this.promisePool, data)
    }

    async selectDataFromDB(data: { all: boolean; like: boolean; columns: any[]; conditions: string[][]; table: string }): Promise<any> {
        return selectionHandler(this.promisePool, data)
    }

    async deleteDataFromDB(data: deleteData): Promise<any> {
        return deleteHandler(this.promisePool, data)
    }

    async updateDataFromDB(data: updateData): Promise<any> {
        return updateHandler(this.promisePool, data)
    }

    async findUserByEmail(email: string): Promise<User> {
        const userData = await this.selectDataFromDB({
            table: "users",
            columns: [],
            conditions: [["name", email]], //TODO change to email
            all: true,
            like: false
        })
        const user = new User(userData.result[0]) //TODO check if there are more than one user
        console.log(user)
        return user;
    }
};