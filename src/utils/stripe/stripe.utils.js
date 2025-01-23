import { loadStripe } from "@stripe/stripe-js";

// Instead of process.env Vite uses import.meta.env object
// for env variables
export const stripePromise = loadStripe(
    import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);