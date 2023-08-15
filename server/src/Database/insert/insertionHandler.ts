export default async function (database: any, query: any) {

    const {table, data} = query
    const idsInserted: Array<number> | null = []
    try {
        let rowsInserted = 0
        if (data.length === 0)
            return {
                status: false,
                ids: idsInserted,
                message: 'There is no data to insert'
            }
        for (const dataArray of data) {
            if (dataArray.length === 0) {
                return {
                    status: false,
                    ids: idsInserted,
                    message: 'There is no data to insert',
                };
            }

            const columns = dataArray.map((tuple: any) => tuple[0]);
            const values = dataArray.map((tuple: any) => tuple[1]);

            const query = `INSERT INTO ${table} (${columns.join(', ')}) VALUES ("${values.join('", "')}")`
            const result = await database.execute(query)

            const resultHeader: any = result[0]
            const affectedRows: number = resultHeader.affectedRows
            const idInserted: number = resultHeader.insertId

            if (affectedRows === 1) {
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
            ids: idsInserted,
            message: 'Error executing query: ' + error,
        };
    }

}