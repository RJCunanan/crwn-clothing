import { useState } from 'react';

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        // Prevents any default behavior of the form. Everything that happens
        // in the form, we are going to handle ourselves.
        event.preventDefault();

        // Confirm if the passwords match
        if(password !== confirmPassword) {
            alert("passwords do not match");
            return;
        }

        // See if user is authenticated with email and password
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            
            // Create a user document from what is returned from 
            // createAuthUserWithEmailAndPassword
            await createUserDocumentFromAuth(user, { displayName });

            // Clear out the form fields
            resetFormFields();

        } catch(error) {
            if(error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use');
            } else {
                console.log('user creation encountered an error', error);
            }
        }
    }

    // Takes input event object whenever the text changes in input fields
    // through "onChange" handler.
    const handleChange = (event) => {
        // destructure the name and value off of the event object
        const { name, value } = event.target;

        // Update the state with the new form information taken from the
        // input text fields.
        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <div>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <label>Display Name</label>
                <input type="text" required onChange={handleChange} name="displayName" value={displayName} />

                <label>Email</label>
                <input type="email" required onChange={handleChange} name="email" value={email} />

                <label>Passowrd</label>
                <input type="password" required onChange={handleChange} name="password" value={password} />

                <label>Confirm Password</label>
                <input type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} />

                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpForm;