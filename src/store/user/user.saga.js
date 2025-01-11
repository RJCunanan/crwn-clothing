import { takeLatest, put, all, call } from "redux-saga/effects";

import { USER_ACTION_TYPES } from "./user.types";

import { signInSuccess, signInFailed } from "./user.action";

import { 
    getCurrentUser, 
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";


// Saga:
export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
    try {
        const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additionalDetails);
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    } catch(error) {
        yield put(signInFailed(error));
    }
}

// Saga:
export function* signInWithGoogle() {
    try {
        // Get the user object from the auth object that is returned
        // from the google popup sign in.
        const { user } = yield call(signInWithGooglePopup);
        yield call(getSnapshotFromUserAuth, user);
    } catch(error) {
        yield put(signInFailed(error));
    }
}

// Saga:
// Recieves the action with the payload that contains the email and
// password.
export function* signInWithEmail({ payload: { email, password }}) {
    try {
        const { user } = yield call(
            signInAuthUserWithEmailAndPassword,
            email,
            password,
        );
        yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

// Saga:
export function* isUserAuthenticated() {
    try {
        // Check if the user is still authenticated
        const userAuth = yield call(getCurrentUser);
        // If userAuth is null (has no value), don't do anything
        if(!userAuth) return;
        yield call(getSnapshotFromUserAuth, userAuth);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onEmailSigninStart() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* userSagas() {
    yield all([
        call(onCheckUserSession), 
        call(onGoogleSignInStart),
        call(onEmailSigninStart),
    ]);
}