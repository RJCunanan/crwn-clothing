import { useState } from 'react';
import { useDispatch } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';
import { googleSignInStart, emailSignInStart } from '../../store/user/user.action';


const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart());
    };

    const handleSubmit = async (event) => {
        // Prevents any default behavior of the form. Everything that happens
        // in the form, we are going to handle ourselves.
        event.preventDefault();

        // See if user is authenticated with email and password
        try {
            // User signs in
            dispatch(emailSignInStart(email, password));

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
        <SignInContainer>
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

                <ButtonsContainer>
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google sign in</Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    )
}

export default SignInForm;