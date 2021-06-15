import { FormEvent, useContext, useRef, useState } from 'react';
import './signUpForm.css';
import firebase from '../firebaseConfig';
import { AuthContext } from '../context/auth-context';
import User from '../model/dbUserModel';

interface Props {
    onSubmit: (dbUser: User) => void;
}

function SignUpForm({ onSubmit }: Props) {
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ phoneNumber, setPhoneNumber ] = useState("");
    const [ city, setCity ] = useState("");

    const { user } = useContext(AuthContext);

    function handleSubmit(event: FormEvent): void {
        event.preventDefault();

        const dbUser: User = {
            name: user?.displayName,
            email: user?.email,
            phoneNumber: phoneNumber,
            city: city
        }
    }

    function ClearForm() {
        setFirstName("");
        setLastName("");
        setPhoneNumber("");
        setCity("");
    }

    return (
        <form className="dbUserForm" onSubmit={handleSubmit}>
            <h2>Sign Up for WTF Truck</h2>
            <p className="formName">
                <label htmlFor="dbUserFormName">Name:</label>
                { user && 
                <p>{user?.displayName}</p>
                }            
                </p>
            <p className="formEmail">
                <label htmlFor="dbUserEmail">Email:</label>
                { user && 
                <p>{user?.email}</p>
                }
            </p>
            <p className="formPhoneNumber">
                <label htmlFor="dbUserFormPhoneNumber">Phone Number:</label>
                <input id="dbUserFormPhoneNumber" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} required />
            </p>
            <p className="formCity">
                <label htmlFor="dbUserFormCity">Home City:</label>
                <input id="dbUserFormCity" value={city} onChange={e => setCity(e.target.value)} required />
            </p>
            <p className="formSubmit">
                <button type="submit">Sign Up</button>
            </p>
        </form>
    )
}
