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
            const email = 'test@example.com';
            const data = await connection.selectDataFromDB({all: true, like: false, columns: [], conditions: [['email', email]], table: 'users'})
            const user = await connection.findUserByEmail(email);
            expect(user).toBeInstanceOf(User);
            expect(user!.email).toBe(email);
        });

        it('should return null for non-existent email', async () => {
            const connection = Connection.getInstance();

            const email = 'nonexistent@example.com';
            const user: User = await connection.findUserByEmail(email);

            expect(user).toBeNull();
        });

        it('should find123123 a user by email', async () => {
            const connection = Connection.getInstance();

            // Mocking selectDataFromDB for the test
            const mockedUserData = {
                result: [
                    {
                        id: 1,
                        name: 'Test User',
                        lastname: 'Lastname',
                        email: 'test@example.com',
                        salt: 'somesalt',
                        isAdministrator: false,
                        hashedPassword: 'hashed'
                    }
                ]
            };
            connection.selectDataFromDB = jest.fn().mockResolvedValue(mockedUserData);

            const email = 'test@example.com';
            const user = await connection.findUserByEmail(email);

            expect(user).toBeInstanceOf(User);
            expect(user.id).toBe(mockedUserData.result[0].id);
            expect(user.name).toBe(mockedUserData.result[0].name);
            // ... continue with other properties
        });

    });


});
