import Connection from '../index'; // Use the correct import path
import { MockConnection } from './mockConnection';
import User from '../../Models/user/user'; // Use the correct import path

jest.mock('../index', () => ({
    getInstance: jest.fn(() => new MockConnection()),
}));

describe('Connection', () => {
    describe('findUserByEmail', () => {
        it('should find a user by email', async () => {
            const connection = Connection.getInstance();
            console.log(connection)
            const email = 'test@example.com';
            const data = await connection.selectDataFromDB({all: true, like: false, columns: [], conditions: [['name', email]], table: 'users'})
            console.log(data)
            const user = await connection.findUserByEmail(email);
            console.log(user)
            expect(user).toBeInstanceOf(User);
            expect(user!.email).toBe(email);
        });

        it('should return null for non-existent email', async () => {
            const connection = Connection.getInstance();

            const email = 'nonexistent@example.com';
            const user: User = await connection.findUserByEmail(email);

            expect(user).toBeNull();
        });
        it('should find a user by email', async () => {
            const connection = Connection.getInstance();

            // Mocking selectDataFromDB for the test
            connection.selectDataFromDB = jest.fn().mockResolvedValue({
                result: [
                    {
                        id: 1,
                        name: 'Test User',
                        email: 'test@example.com',
                        // ... other properties
                    }
                ]
            });

            const email = 'test@example.com';
            const user = await connection.findUserByEmail(email);

            expect(user).toBeInstanceOf(User);
            expect(user!.email).toBe(email);
        });
    });

    // ... Other tests for other methods
});
