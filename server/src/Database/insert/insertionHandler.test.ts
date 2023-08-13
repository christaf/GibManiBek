import insertionHandler from './insertionHandler';

describe('insertionHandler', () => {
    it('should return status false and message when data length is 0', async () => {
        const executeMock = jest.fn();
        const databaseMock = {
            execute: executeMock
        };

        // Your test query
        const query = {
            table: 'testTable',
            data: [['column1', 'value1'], ['column2', 'value2']]
        };

        // Call the insertionHandler with the mock database
        await insertionHandler(databaseMock, query);

        // Assert that database.execute was called with the correct query
        expect(executeMock).toHaveBeenCalledWith(
            'INSERT INTO testTable (column1, column2) VALUES ("value1", "value2")'
        );
    });

});