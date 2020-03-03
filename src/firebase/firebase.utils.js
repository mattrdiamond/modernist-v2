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
