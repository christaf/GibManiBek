import deleteHandler from "./deleteHandler";

describe('deleteHandler', () => {
    const dbMock: any = {
        execute: jest.fn(),
    };

    beforeEach(() => {
        dbMock.execute.mockReset();
    });

    it('deletes rows with conditions', async () => {
        const query = {
            table: 'testTable',
            conditions: [['column1', 'value1']] as [string, any][],
        };

        dbMock.execute.mockResolvedValueOnce([[{ affectedRows: 2 }]]);
        const result = await deleteHandler(dbMock, query);

        expect(result.status).toBe(true);
        expect(result?.result).toEqual([{ affectedRows: 2 }]);
        expect(result.message).toBe('Rows deleted: 2');
    });

    it('handles no conditions', async () => {
        const query = {
            table: 'testTable',
            conditions: [] as [string, any][],
        };

        dbMock.execute.mockResolvedValueOnce([[{ affectedRows: 0 }]]);
        const result = await deleteHandler(dbMock, query);

        expect(result.status).toBe(true);
        expect(result.result).toEqual([{ affectedRows: 0 }]);
        expect(result.message).toBe('Rows deleted: 0');
    });

    it('handles execution error', async () => {
        const query = {
            table: 'testTable',
            conditions: [['column1', 'value1']] as [string, any][],
        };

        dbMock.execute.mockRejectedValueOnce(new Error('Query execution error'));
        const result = await deleteHandler(dbMock, query);

        expect(result.status).toBe(false);
        expect(result.message).toBe('Error: Query execution error');
    });
});
