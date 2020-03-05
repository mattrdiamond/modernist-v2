import firebase from "firebase/app";
import "firebase/firestore"; //database
import "firebase/auth"; //authentication

const config = {
  apiKey: "AIzaSyAKQUl3X_MsB--NC2mmBv1QDlkYedesjyM",
  authDomain: "e-commerce-9e6dc.firebaseapp.com",
  databaseURL: "https://e-commerce-9e6dc.firebaseio.com",
  projectId: "e-commerce-9e6dc",
  storageBucket: "e-commerce-9e6dc.appspot.com",
  messagingSenderId: "215401701740",
  appId: "1:215401701740:web:1c4078516bb4ba942f5349",
  measurementId: "G-45QGGVYL1N"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  // 1. Return if user signed out (null)
  if (!userAuth) return;

  // Document reference to user. uid is dynamically generated id that firestore created when user authenticated
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  // 2. Query firestore to see if object exists.
  //    Note: .get() returns a snapshot object which represents the data at that location in db,
  //           which we can use to see if userAuth exists
  const snapShot = await userRef.get();

  // 3. If user doesn't exist, create one in that location.
  //    Note: use document reference object (userRef) to do CRUD operations rather than snapshot
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth(); // we imported firebase/auth above which gives us access to .auth() method on firebase. Export for anything we need related to authentication
export const firestore = firebase.firestore();

// set up google authentication utility
const provider = new firebase.auth.GoogleAuthProvider(); // gives us access to googleAuthProvider class from auth library
// triggers google popup when we use googleAuthProvider for authentication and sign-in
provider.setCustomParameters({ prompt: "select_account" });
// signInWithPopup contains popups for several services (sign in with twitter, facebook etc). We just want google
export const signInWithGoogle = () => auth.signInWithPopup(provider);
// export firebase as default in case we want entire library
export default firebase;
