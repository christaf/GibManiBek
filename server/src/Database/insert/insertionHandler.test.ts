import insertionHandler from './insertionHandler';

describe('insertionHandler', () => {
    it('should return status false and message when data length is 0', async () => {
        const databaseMock = {}; //mock of database TODO change to jest-mock
        const query = { table: 'testTable', data: [] };
        const result = await insertionHandler(databaseMock, query);

        expect(result).toEqual({
            status: false,
            message: 'There is no data to insert'
        });
    });

});