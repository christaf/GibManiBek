import express from 'express'
import Connection from "../Database";
import config from "config"

const app = express();
const port = config.get("APP.PORT");

async function ServerStart(Connection: Connection) {
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    // app.listen(port, () => {
    //     return console.log(`Serwer uruchomiony na porcie ${port}`);
    // });
    const query = {
        table: 'testTable',
        data: [
            [['column1', 'value1'], ['column2', 'value2']],
            [['column1', 'value11']]
        ]
    };

    const insertion = await Connection.insertDataIntoDB({
        table: "users",
        data: [[
            ["name", "Sandra"],
            ["lastname", "Boss"],
            ["password", "ugabuga"],
            ["salt", "slonejezioro"]],
            [["name", "mateusz"]]
        ]
    })

    console.log(insertion)

    //const selection = await Connection.selectDataFromDB({
    //      "table": "users:
    //      "data": [
    //          [],
    //          []
    //      ]
    // })

}

export {app, ServerStart};