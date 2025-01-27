// Imports in the dotenv library and attaches all of our secret variables on
// the dotenv file onto our process environment
require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

// Receive the payment request
exports.handler = async (event) => {
    try {
        // Get the payment amount as a whole number in cents
        const { amount } = JSON.parse(event.body);

        // Create a payment intent by passing in an object specifying the payment details
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
            payment_method_types: ["card"],
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ paymentIntent }),
        };
    } catch (error) {
        console.log({ error });

        return {
            status: 400,
            body: JSON.stringify({ error }),
        };
    }
};