// Chained currying middleware function for creating reusable middleware functions:
export const loggerMiddleware = (store) => (next) => (action) => {
    if(!action.type) {
        return next(action);
    }

    console.log('type: ', action.type);
    console.log('payload: ', action.payload);

    // Log the current state
    console.log('currentState: ', store.getState());

    // Call next() to update the store so we can get the new state
    next(action);

    // Log the new state
    console.log('next state: ', store.getState());
}