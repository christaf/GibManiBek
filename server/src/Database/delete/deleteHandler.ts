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
        const result = await database.execute(query);

        const resultHeader: { affectedRows: number }[] = result[0];
        const affectedRows: number = resultHeader[0]?.affectedRows ?? 0;

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
