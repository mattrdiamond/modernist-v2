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

  // Use userAuth obj to query db for documentReference to user. uid is dynamically generated id that firestore created when user authenticated
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  // 2. Then use documentReference object to get snapShot object, which includes a boolean 'exists' property
  //    Note: .get() returns a snapshot object which represents the data at that location in db,
  //           which we can use to see if userAuth exists
  const snapShot = await userRef.get();

  // 3. If user doesn't exist, create new user inside userRef (within db).
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

// Add collection (shop.collection) and document objects (shop data) to firestore
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  // 1. Create firestore batch object
  const batch = firestore.batch();

  objectsToAdd.forEach(obj => {
    // 2. Create a new documentReference object for each category in collection (i.e. hats). Firestore's .doc() method (without params) will generate random IDs which will also be used for url path
    const newDocRef = collectionRef.doc();
    // 3. Set the value (title and items) for each docRef object by batching .set() calls together.
    batch.set(newDocRef, obj);
  });

  // Execute batch request, which returns a promise. When .commit() succeeds it will resolve a void (null) value
  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collections => {
  // .docs gives us query snapshot, .data() gives us data, only need title and items
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();
    // return object from back end that only includes data we need for front end
    // routeName is a new property who's value will be the same string as title (ie hats). encodeURI - encodes URI by replacing characters that a URL cannot process.
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });
  // Convert array of objects to new object. Reduce iterates through each collection in array (ie hats) and adds collection title to new object. It then sets the property value equal to the actual collection object --> hats: {routeName: 'hats', id: 123, etc.}
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

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
