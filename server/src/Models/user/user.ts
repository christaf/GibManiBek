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
    salt: string;
    isAdministrator: boolean;
    hashedPassword: string | null;

    constructor(props: UserProps, password?: string) {
        this.id = props.id;
        this.name = props.name;
        this.lastname = props.lastname;
        this.email = props.email;

        this.isAdministrator = props.isAdministrator || false;

        const saltPromise = props.salt ? Promise.resolve(props.salt) : bcrypt.salt(10);

        if (password) {
            saltPromise.then(salt => {
                this.salt = salt;
                this.hashedPassword = this.hashPassword(password, salt);
            });
        } else {
            this.salt = ""; // Set a default value or handle null case
            this.hashedPassword = null;
        }
    }

    public async isValidPassword(password: string): Promise<boolean> {
        if (!this.hashedPassword) {
            return false;
        }
        return bcrypt.compare(password, this.hashedPassword);
    }

    private hashPassword(password: string, salt: string): string {
        return bcrypt.hash(password, salt);
    }

}
