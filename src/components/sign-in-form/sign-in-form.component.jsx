import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { 
    signInWithGooglePopup, 
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';

import './sign-in-form.styles.scss';


const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    };

    const handleSubmit = async (event) => {
        // Prevents any default behavior of the form. Everything that happens
        // in the form, we are going to handle ourselves.
        event.preventDefault();

        // See if user is authenticated with email and password
        try {
            // Get the user object when the user signs in
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);

            // Clear out the form fields
            resetFormFields();
        } catch(error) {
            if (error.code === "auth/invalid-credential") {
                alert('incorrect email or password');
            }
            console.log(error);
        }
    };

    // Takes FormInput event object whenever the text changes in FormInput fields
    // through "onChange" handler.
    const handleChange = (event) => {
        // destructure the name and value off of the event object
        const { name, value } = event.target;

        // Update the state with the new form information taken from the
        // FormInput text fields.
        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label="Email"
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name="email" 
                    value={email} 
                />

                <FormInput 
                    label="Password"
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="password" 
                    value={password} 
                />

                <div className='buttons-container'>
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType='google' onClick={signInWithGoogle}>Google sign in</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;