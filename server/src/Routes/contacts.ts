import Connection from "../Database";

export async function getContacts(id: string) {
    const connection = Connection.getInstance();
    const contacts = await connection.findContactsById(id);
    const friendsIdList = contacts.map((contact: any) => {
        return contact.friend_id;
    });
    const userList = [];
    for (const id of friendsIdList) {
        //TODO HARD CODED ID = 1
        const user = await connection.findContactUserById("1"); //podmienic na id
        userList.push(user);
    }
    return userList;
}