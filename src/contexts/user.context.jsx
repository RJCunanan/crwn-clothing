import { createContext, useEffect, useReducer } from 'react';

import { createAction } from '../utils/reducer/reducer.utils';

import { 
    onAuthStateChangedListener, 
    createUserDocumentFromAuth, 
} from '../utils/firebase/firebase.utils';

// The actual value you want to access
export const UserContext = createContext({
    // intial values of context:
    currentUser: null,  // default empty state of the user object
    setCurrentUser: () => null,     // empty function that returns null
});

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
}

const INITIAL_STATE = {
    currentUser: null
}

const userReducer = (state, action) => {
    const { type, payload } = action;
    
    switch(type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in userReducer`);

    }
}

export const UserProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer(userReducer, INITIAL_STATE);
    const { currentUser } = state;
    
    // Passes the action object to userReducer:
    const setCurrentUser = (user) => {
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
    }

    // The value that will be passed and the setter
    const value = { currentUser, setCurrentUser };

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if(user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        })

        // Unsubscribe the listener from the stream
        return unsubscribe;
    }, []);

    // Allows retrieval of value and calling of setter anywhere in
    // the component tree that is nested inside of the Provider
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};