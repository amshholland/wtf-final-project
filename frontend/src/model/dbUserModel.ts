export default interface User {
    _id?: string;
    name: string | undefined | null;
    email: string | undefined | null;
    phoneNumber: string;
    city: string;
}