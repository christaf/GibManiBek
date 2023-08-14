import insertionHandler from './insertionHandler';

describe('insertionHandler', () => {
    it('correct value test', async () => {
        const executeMock = jest.fn();
        const databaseMock = {
            execute: executeMock
        };

        const query = {
            table: 'testTable',
            data: [[['column1', 'value1'], ['column2', 'value2']], [['column1', 'value11']]]
        };

        await insertionHandler(databaseMock, query);

        expect(executeMock).toHaveBeenCalledWith(
            'INSERT INTO testTable (column1, column2) VALUES ("value1", "value2")'
        );
    });

});