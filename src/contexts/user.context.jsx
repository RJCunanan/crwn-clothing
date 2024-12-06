import { createContext, useState } from 'react';

// The actual value you want to access
export const UserContext = createContext({
    // intial values of context:
    currentUser: null,  // default empty state of the user object
    setCurrentUser: () => null,     // empty function that returns null
});

export const UserProvider = ({ children }) => {
    // Store the user state using hook
    const [currentUser, setCurrentUser] = useState(null);

    // The value that will be passed and the setter
    const value = { currentUser, setCurrentUser };

    // Allows retrieval of value and calling of setter anywhere in
    // the component tree that is nested inside of the Provider
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}