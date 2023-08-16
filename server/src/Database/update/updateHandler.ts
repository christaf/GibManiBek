export default async function (database: any, query: any) {
    const { table, conditions, values } = query;

    try {
        let conditionSentence: string = "";

        if (conditions.length !== 0) {
            conditionSentence += "WHERE ";
            const conditionColumns: string[] = conditions.map((tuple: [string, any]) => tuple[0]);
            const conditionValues: any[] = conditions.map((tuple: [string, any]) => tuple[1]);

            conditionSentence += conditionColumns.map((column: string, columnID: number) => `${column} = "${conditionValues[columnID]}"`).join(' AND ');
        }

        const updateValues = values.map((tuple: [string, any]) => `${tuple[0]} = "${tuple[1]}"`).join(', ');

        const query = `UPDATE ${table} SET ${updateValues} ${conditionSentence}`;
        const result = await database.execute(query);
        const resultHeader: any[] = result[0];
        const affectedRows: number = resultHeader[0]?.affectedRows ?? 0;

        return {
            status: true,
            result: resultHeader,
            message: 'Rows updated: ' + affectedRows,
        };
    } catch (error) {
        return {
            status: false,
            message: '' + error,
        };
    }
}
