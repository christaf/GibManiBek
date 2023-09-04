interface ContactUserProps {
    id: number;
    name: string | null;
    lastname: string | null;
    email: string;
}
export default class ContactUser implements ContactUserProps {
    id: number;
    name: string | null;
    lastname: string | null;
    email: string;
    constructor(props: ContactUserProps) {
        this.id = props.id;
        this.name = props.name;
        this.lastname = props.lastname;
        this.email = props.email;
    }
}