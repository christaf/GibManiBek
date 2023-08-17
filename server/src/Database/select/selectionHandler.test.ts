import selectHandler from "./selectionHandler";

describe('selectHandler', () => {
    const dbMock: any = {
        execute: jest.fn(),
    };

    beforeEach(() => {
        dbMock.execute.mockReset();
    });

    it('selects all columns with no conditions', async () => {
        const query = {
            table: 'testTable',
            conditions: [] as [string, any][],
            columns: ['column1', 'column2'],
            like: false,
            all: true,
        };

        dbMock.execute.mockResolvedValueOnce([[{ column1: 'value1', column2: 'value2' }]]);
        const result = await selectHandler(dbMock, query);

        expect(result.status).toBe(true);
        expect(result.result).toEqual([{ column1: 'value1', column2: 'value2' }]);
        expect(result.message).toBe('Rows selected: 1');
    });

    it('selects specific columns with conditions', async () => {
        const query = {
            table: 'testTable',
            conditions: [['column1', 'value1']] as [string, any][],
            columns: ['column1', 'column2'],
            like: false,
            all: false,
        };

        dbMock.execute.mockResolvedValueOnce([[{ column1: 'value1', column2: 'value2' }]]);
        const result = await selectHandler(dbMock, query);

        expect(result.status).toBe(true);
        expect(result.result).toEqual([{ column1: 'value1', column2: 'value2' }]);
        expect(result.message).toBe('Rows selected: 1');
    });

    // Add more test cases for different scenarios

    it('handles execution error', async () => {
        const query = {
            table: 'testTable',
            conditions: [] as [string, any][],
            columns: ['column1', 'column2'],
            like: false,
            all: true,
        };

        dbMock.execute.mockRejectedValueOnce(new Error('Query execution error'));
        const result = await selectHandler(dbMock, query);

        expect(result.status).toBe(false);
        expect(result.message).toBe('Error: Query execution error');
    });
});
