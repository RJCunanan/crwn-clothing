import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage'
import logger from "redux-logger";
import { thunk } from "redux-thunk";

import { rootReducer } from "./root-reducer";


// Config object that tells redux persist what we want
const persistConfig = {
    key: 'root',    // persist everything, from the root level
    storage,        // use local storage in web browser
    whitelist: ['cart'],    // only persist the cart
}

// Create a persisted reducer which we will use for our store
const persistedReducer = persistReducer(persistConfig, rootReducer);

// If the node environment is currently not in 'production', then
// render the logger. Otherwise, filter out any falsey values so they 
// don't render.
const middleWares = [process.env.NODE_ENV !== 'production' && logger, thunk].filter(Boolean);

// If we are not in production, the window object exists, and the redux devtools exist,
// then use redux devtools' compose. Otherwise, use compose from redux.
const composeEnhancer = 
    (process.env.NODE_ENV !== 'production' && 
        window && 
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

// Allows us to persist the store
export const persistor = persistStore(store);