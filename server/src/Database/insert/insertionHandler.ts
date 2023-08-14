export default async function (database: any, query: any) {

    const {table, data} = query
    console.log(table, data)
    try {
        const res = []
        let idsInserted = []
        let rowsInserted = 0
        if (data.length === 0)
            return {
                status: false,
                message: 'There is no data to insert'
            }

        for (const dataArray of data) {
            console.log(dataArray)
            if (dataArray.length === 0) {
                return {
                    status: false,
                    message: 'There is no data to insert',
                };
            }
            //TODO do sth with those ignores XD
            // @ts-ignore
            const columns = dataArray.map(([column]) => column);
            console.log(columns)
            // @ts-ignore
            const values = dataArray.map(([,value]) => value);
            console.log(values)

            const query = `INSERT INTO ${table} (${columns.join(', ')}) VALUES ("${values.join('", "')}")`
            console.log(query)

            const result: any = await database.query(query)
            console.log(result)
            const resultHeader = result[0]
            const affectedRows = resultHeader.affectedRows
            const idInserted = resultHeader.insertId
            if(affectedRows === 1) {
                rowsInserted++;
                idsInserted.push(idInserted)
            }
        }
        return {
            status: true,
            ids: idsInserted,
            message: 'Rows inserted: ' + rowsInserted,
        };

    } catch (error) {
        return {
            status: false,
            message: 'Error executing query: ' + error,
        };
    }

}