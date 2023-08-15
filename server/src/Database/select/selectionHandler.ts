export default async function (database: any, query: any) {

    const {table, conditions, columns, like, all} = query
    try {

        let searchRange = (all || conditions.length === 0) ? "*" : columns.join(', ')
        let conditionSentence = ""
        if (conditions.length !== 0) {
            conditionSentence += "WHERE "
            const conditionColumns = conditions.map((tuple) => tuple[0])
            const conditionValues = conditions.map((tuple) => tuple[1])

            conditionSentence += (like ?
                    conditionColumns.map((column, columnID) => `${column} LIKE "%${conditionValues[columnID]}%"`).join(' AND ')
                    :
                    conditionColumns.map((column, columnID) => `${column} = "${conditionValues[columnID]}"`).join(' AND ')
            )
        }

        const query = `SELECT ${searchRange} FROM ${table} ${conditionSentence}`
        const result = await database.execute(query)

        const resultHeader: any = result[0]

        return {
            status: true,
            result: resultHeader
        };

    } catch (error) {
        return {
            status: false,
            message: 'Error executing query: ' + error,
        };
    }

}