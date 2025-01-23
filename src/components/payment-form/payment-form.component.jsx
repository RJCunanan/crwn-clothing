import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component'

import { PaymentFormContainer, FormContainer } from "./payment-form.styles";

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const paymentHandler = async (e) => {
        // Stops any typical form submission behavior from happening
        e.preventDefault();

        // Exit if either instance is not present
        if(!stripe || !elements) {
            return;
        }

        
    }

    return (
        <PaymentFormContainer>
            <FormContainer>
                <h2>Credit Card Payment: </h2>
                <CardElement />
                <Button buttonType={BUTTON_TYPE_CLASSES.inverted}> Pay now </Button>
            </FormContainer>
        </PaymentFormContainer>
    )
}

export default PaymentForm;