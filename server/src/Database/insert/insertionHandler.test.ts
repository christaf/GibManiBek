import insertionHandler from "./insertionHandler"
describe('InsertionHandler', () => {
    it('correct values inserted', async () => {

        const dbMock = {
            execute: jest.fn().mockReturnValueOnce([{affectedRows: 1, insertId: 1}])
                .mockReturnValueOnce([{affectedRows: 1, insertId: 2}])
        };

        const query = {
            table: 'testTable',
            data: [
                [['column1', 'value1'], ['column2', 'value2']],
                [['column1', 'value11']]
            ]
        };
        const result = await insertionHandler(dbMock, query);
        expect(result.status).toBe(true);
        expect(result.ids).toEqual([1, 2]);
        expect(result.message).toBe('Rows inserted: 2');
        expect(dbMock.execute.mock.calls[0][0]).toBe('INSERT INTO testTable (column1, column2) VALUES ("value1", "value2")');
    });
});