import { Form, useLoaderData } from "react-router-dom";
import { getContact } from "../contacts.ts";

export async function loader({ params }) {
    const contact = await getContact(params.contactId);
    return { contact };
}

export default function Contact() {
    const { contact } = useLoaderData();

    return (
        <div id="contact">
            <div>
                <img
                    key={contact.avatar}
                    src={contact.avatar || null}
                />
            </div>

            <div>
                <h1>
                    {contact.first || contact.last ? (
                        <>
                            {contact.first} {contact.last}
                        </>
                    ) : (
                        <i>No Name</i>
                    )}{" "}
                </h1>

                {contact.debt && <p>{contact.debt}</p>}

                {contact.notes && <p>{contact.notes}</p>}

                <div>
                    <Form action="edit">
                        <button type="submit">Edit</button>
                    </Form>
                    <Form
                        method="post"
                        action="destroy"
                        onSubmit={(event) => {
                            if (
                                !confirm(
                                    "Please confirm you want to delete this record."
                                )
                            ) {
                                event.preventDefault();
                            }
                        }}
                    >
                        <button type="submit">Delete</button>
                    </Form>
                    <Form
                        method="post"
                        action="pay"
                        onSubmit={() => {
                            console.log("Navigateto paypal", contact.debt);
                        }}
                    >
                        <button type="submit">Pay With PayPal</button>
                    </Form>
                </div>
            </div>
        </div>
    );
}