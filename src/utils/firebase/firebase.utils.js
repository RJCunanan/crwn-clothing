import { initializeApp } from 'firebase/app';    // Get Firebase's suite of tools through the "app"
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup,
    GoogleAuthProvider, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import {
    getFirestore,   // method that allows us to instantiate our firestore db instance
    doc,    // method that allows us to retrieve documents inside our firestore database
    getDoc, // method that lets us get a document's data
    setDoc,  // method that lets us set a document's data
    collection, // method that allows us to get a collection reference
    writeBatch, // method that writes to a collection
    query,
    getDocs,
} from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBpoSESs57GO7rMeEynsaks41aoJOS3-Ng",
    authDomain: "crwn-clothing-db-5b76f.firebaseapp.com",
    projectId: "crwn-clothing-db-5b76f",
    storageBucket: "crwn-clothing-db-5b76f.firebasestorage.app",
    messagingSenderId: "1076082974875",
    appId: "1:1076082974875:web:9c85e8b2de3f5abcc8e63e"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

// Everytime somebody interacts with our googleProvider, we want to
// always force them to select an account.
googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

// Instantiate our Firestore database
export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    // Search the database for the correct collection using the collectionKey
    const collectionRef = collection(db, collectionKey);

    // Create an instance of batch from the database
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        // Create a document reference from the specified collection by getting
        // the key or the object's title
        const docRef = doc(collectionRef, object.title.toLowerCase())

        // Using the location provided by the docRef, set the value of the object
        // in the collection
        batch.set(docRef, object);
    });

    // Fire off the batch
    await batch.commit();
    console.log('done');
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');

    // Generate a query off of the provided collection reference
    const q = query(collectionRef);

    // Asynchronously fetch the document snapshots
    const querySnapshot = await getDocs(q);

    // Get the categories as an array
    return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
}

// Takes data from user authentication service and stores it inside of Firestore
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    // Exit if userAuth is not recieved
    if (!userAuth) return;
    
    // Retrieves the document "reference" from the database
    // Takes 3 arguments: the database, the collection, a unique ID
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);

    // Fetch/Get the document from our user document reference
    // Note: a snapshot is a specific object; our data
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);

    // Returns a boolean that tells us whether or not our reference and its
    // associated data even exists inside of our Firestore database
    console.log(userSnapshot.exists());

    // if user data does not exists...
    // create/set the document with the data from userAuth in my collection
    if (!userSnapshot.exists())  {
        const { displayName, email } = userAuth;
        const createdAt = new Date();   // Tell us when users are signing in

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            })
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }   

    // if user data exists...
    // return userDocRef
    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    // Exit when there is no email or password
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    // Exit when there is no email or password
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => {
    onAuthStateChanged(auth, callback);
}