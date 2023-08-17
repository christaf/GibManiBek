import bcrypt from 'bcrypt';

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
    salt: string | null;
    isAdministrator: boolean;
    hashedPassword: string | null;

    constructor(props: UserProps, password?: string) {
        this.id = props.id;
        this.name = props.name;
        this.lastname = props.lastname;
        this.email = props.email;
        this.salt = props.salt;
        this.isAdministrator = props.isAdministrator || false;

        if (password) {
            this.hashedPassword = this.hashPasswordSync(password, props.salt);
        } else {
            this.hashedPassword = null;
        }
    }

    public async isValidPassword(password: string): Promise<boolean> {
        if (!this.hashedPassword) {
            return false;
        }
        return bcrypt.compare(password, this.hashedPassword);
    }

    private hashPasswordSync(password: string, salt: string | null): string {
        return bcrypt.hash(password, salt || bcrypt.salt(10));
    }

}
