import { BaseButton, GoogleSignInButton, InvertedButton, ButtonSpinner } from "./button.styles";

// Allows us to apply different classNames for different styling depending
// on the type of button.
export const BUTTON_TYPE_CLASSES = {
    base: 'base',
    google: 'google-sign-in',
    inverted: 'inverted',
}

// Takes the button type string and returns one of the three button components
const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => (
    {
        [BUTTON_TYPE_CLASSES.base]: BaseButton,
        [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
        [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
    }[buttonType]
)

const Button = ({ children, buttonType, isLoading, ...otherProps }) => {
    // Creates component that points to one of the three relevant buttons
    const CustomButton = getButton(buttonType);
    return (
        <CustomButton disabled={isLoading} {...otherProps}>
            {isLoading ? <ButtonSpinner /> : children}
        </CustomButton>
    )
}

export default Button;