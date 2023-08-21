/**
 * @description Handles selection of data from database
 * @example
 *      const res3 = await Connection.selectDataFromDB({
 *          table: "users",
 *          conditions: [],
 *          columns: [],
 *          all: true,
 *          like: true
 *      })
 */

export default async function (database: any, query: any) {
    const { table, conditions, columns, like, all } = query;

    try {
        let searchRange = (all || conditions.length === 0) ? "*" : columns.join(', ');
        let conditionSentence = "";

        if (conditions.length !== 0) {
            conditionSentence += "WHERE ";
            const conditionColumns: string[] = conditions.map((tuple: [string, any]) => tuple[0]);
            const conditionValues: any[] = conditions.map((tuple: [string, any]) => tuple[1]);

            conditionSentence += like
                ? conditionColumns.map((column: string, columnID: number) => `${column} LIKE "%${conditionValues[columnID]}%"`).join(' AND ')
                : conditionColumns.map((column: string, columnID: number) => `${column} = "${conditionValues[columnID]}"`).join(' AND ');
        }

        const query = `SELECT ${searchRange} FROM ${table} ${conditionSentence}`;
        const result = await database.execute(query);

        const resultHeader: any[] = result[0];

        return {
            status: true,
            result: resultHeader,
            message: 'Rows selected: ' + resultHeader.length,
        };
    } catch (error) {
        return {
            status: false,
            message: '' + error,
        };
    }
}
