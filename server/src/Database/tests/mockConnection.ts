import User from "../../Models/user/user";

interface insertData {
    "table": string
    "data": Array<Array<[string, string]>>
}

interface selectData {
    "table": string
    "columns": Array<string>
    "conditions": Array<[string, string]>
    "all": boolean
    "like": boolean
}

interface updateData {
    table: string;
    data: Array<Array<[string, string]>>;
    conditions: Array<Array<[string, string]>>;
}

interface deleteData {
    "table": string
    "conditions": Array<[string, string]>
}
export class MockConnection {

    async selectDataFromDB(data: selectData): Promise<any> {
        if (data.conditions[0][0] === "email" && data.conditions[0][1] === "test@example.com") {
            return {
                result: [
                    {
                        id: 1,
                        name: "Test User",
                        lastname: "Lastname",
                        email: "test@example.com",
                        salt: "somesalt",
                        isAdministrator: false
                    }
                ]
            };
        } else {
            return { result: [] };
        }
    }

    // async findUserByEmail(email: string): Promise<User | null> {
    //     const data = await this.selectDataFromDB({
    //         table: "users",
    //         columns: [],
    //         conditions: [["email", email]],
    //         all: true,
    //         like: false,
    //     });
    //
    //     if (data.result.length > 0) {
    //         const userData = data.result[0];
    //         const user = new User(userData);
    //         return user;
    //     } else {
    //         return null;
    //     }
    // }
}