export default async function (database: any, query: any) {
    const {table, conditions} = query;

    try {
        let conditionSentence: string = "";

        if (conditions.length !== 0) {
            conditionSentence += "WHERE ";
            const conditionColumns: string[] = conditions.map((tuple: [string, any]) => tuple[0]);
            const conditionValues: any[] = conditions.map((tuple: [string, any]) => tuple[1]);

            conditionSentence += conditionColumns.map((column: string, columnID: number) => `${column} = "${conditionValues[columnID]}"`).join(' AND ');
        }

        const query = `DELETE FROM ${table} ${conditionSentence}`;
        console.log(query)
        const result = await database.execute(query);
        const resultHeader: any[] = result[0];
        const affectedRows: number | null = resultHeader.affectedRows

        return {
            status: true,
            result: resultHeader,
            message: 'Rows deleted: ' + affectedRows,
        };
    } catch (error) {
        return {
            status: false,
            message: '' + error,
        };
    }
}
