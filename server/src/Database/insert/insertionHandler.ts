export default async function (database, query) {

    const {table, data} = query

    try {
        const res = []
        if (data.length === 0)
            return {
                status: false,
                message: 'There is no data to insert'
            }

        for (const dataPair of data) {
            if (dataPair.length !== 2) {
                return {
                    status: false,
                    message: 'Empty one of given single query columns and values.',
                };
            }
        }

        const columns = data.map(tuple => tuple[0]);
        const values = data.map(tuple => tuple[1]);

        const query = `INSERT INTO ${table} (${columns.join(', ')}) VALUES ("${values.join('", "')}")`

        const result = await database.execute(query)
        const resultHeader = result[0]
        const rowsInserted = resultHeader.affectedRows
        const idInserted = resultHeader.insertId

        return {
            status: true,
            ids: idInserted,
            message: 'Rows inserted: ' + rowsInserted,
        };
    } catch (error) {
        return {
            status: false,
            message: 'Error executing query: ' + error,
        };
    }

}