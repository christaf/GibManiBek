import bcrypt from 'bcrypt';
import Connection from "../../Database";

interface UserProps {
    id: number;
    name: string | null;
    lastname: string | null;
    email: string;
    salt: string | null;
    isAdministrator: boolean;
}

export default class User implements UserProps {
    id: number;
    name: string | null;
    lastname: string | null;
    email: string;
    salt!: string;
    isAdministrator: boolean;
    hashedPassword!: string | null;

    constructor(props: UserProps, password?: string) {
        this.id = props.id;
        this.name = props.name;
        this.lastname = props.lastname;
        this.email = props.email;

        this.isAdministrator = props.isAdministrator || false;

        if (!props.salt)
            this.salt = bcrypt.genSaltSync(10);
        else
            this.salt = props.salt;

        if (password) {
            this.hashedPassword = this.hashPassword(password, this.salt);
        } else {
            this.hashedPassword = null;
        }
    }

    public async isValidPassword(password: string): Promise<boolean> {
        if (this.hashedPassword === "" || this.hashedPassword === null) {
            const connection = Connection.getInstance();
            return connection.selectDataFromDB({
                table: "users",
                like: false,
                all: false,
                conditions: [["email", this.email]],
                columns: ["hashed_password"]
            }).then(async (data: any) => {
                const hashedPassword: string = data.result[0].hashed_password;
                return bcrypt.compare(password, hashedPassword);
            }).catch((error: any) => {
                console.error("Error retrieving hashed password:", error);
                return false;
            });
        } else {
            return await bcrypt.compare(password, <string>this.hashedPassword);
        }
    }

    private hashPassword(password: string, salt: string): string {
        return bcrypt.hashSync(password, salt);
    }

}
