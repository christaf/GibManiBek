import updateHandler from "./updateHandler";

describe('updateHandler', () => {
    const dbMock: any = {
        execute: jest.fn(),
    };

    beforeEach(() => {
        dbMock.execute.mockReset();
    });

    it('updates rows with conditions', async () => {
        const query = {
            table: 'testTable',
            conditions: [['column1', 'value1']] as [string, any][],
            values: [['column2', 'newValue']],
        };

        dbMock.execute.mockResolvedValueOnce([[{ affectedRows: 2 }]]);
        const result = await updateHandler(dbMock, query);

        expect(result.status).toBe(true);
        expect(result.result).toEqual([{ affectedRows: 2 }]);
        expect(result.message).toBe('Rows updated: 2');
    });

    it('handles no conditions', async () => {
        const query = {
            table: 'testTable',
            conditions: [] as [string, any][],
            values: [['column2', 'newValue']],
        };

        dbMock.execute.mockResolvedValueOnce([[{ affectedRows: 0 }]]);
        const result = await updateHandler(dbMock, query);

        expect(result.status).toBe(true);
        expect(result.result).toEqual([{ affectedRows: 0 }]);
        expect(result.message).toBe('Rows updated: 0');
    });

    it('handles execution error', async () => {
        const query = {
            table: 'testTable',
            conditions: [['column1', 'value1']] as [string, any][],
            values: [['column2', 'newValue']],
        };

        dbMock.execute.mockRejectedValueOnce(new Error('Query execution error'));
        const result = await updateHandler(dbMock, query);

        expect(result.status).toBe(false);
        expect(result.message).toBe('Error: Query execution error');
    });
});