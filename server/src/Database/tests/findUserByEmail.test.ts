import Connection from '../index';
import User from '../../Models/user/user';

// Mocking selectDataFromDB for the test
const mockSelectDataFromDB = jest.fn().mockResolvedValue({
    result: [
        {
            id: 1,
            name: 'Test User',
            email: 'test@example.com',
        }
    ]
});
describe('Connection', () => {
    describe('findUserByEmail', () => {
        const connection = new Connection();
        it('should find a user by email', async () => {

            connection.selectDataFromDB = mockSelectDataFromDB;
            const email = 'test@example.com';
            const user = await connection.findUserByEmail(email);
            expect(user).toBeInstanceOf(User);
            expect(user.email).toBe(email);
        });

        it('should handle missing data gracefully', async () => {

            const email = 'nonexistent@example.com';
            const user = await connection.findUserByEmail(email);

            expect(user).toBeNull();
        });

    });
})
