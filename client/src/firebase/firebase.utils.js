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
  measurementId: "G-45QGGVYL1N",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  // 1. Exit if user signed out (null)
  if (!userAuth) return;

  // Use userAuth obj to query db for documentReference to user. uid is dynamically generated id that firestore created when user authenticated
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  // 2. Use the documentReference object to get snapShot object, which includes a boolean 'exists' property
  //    Note: .get() returns a snapshot object which represents the data at that location in db,
  //           which we can use to see if userAuth exists
  const snapShot = await userRef.get();

  // 3. If user doesn't exist, create new user inside userRef (within db).
  //    Note: use document reference object (userRef) to do CRUD operations rather than snapshot
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    const favorites = null;

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        favorites,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

export const getUserCartRef = async (userId) => {
  // Retrieve all documents in carts collection with matching user id
  const cartsRef = firestore.collection("carts").where("userId", "==", userId);
  const snapShot = await cartsRef.get();

  if (snapShot.empty) {
    // Create document reference object and initialize cartItems as empty array
    const cartDocRef = firestore.collection("carts").doc();
    await cartDocRef.set({ userId, cartItems: [] });
    return cartDocRef;
  } else {
    // or return reference to cart
    return snapShot.docs[0].ref;
  }
};

export const addItemToFavorites = async (currentUser, itemToAdd, favorites) => {
  const userRef = firestore.collection("users").doc(`${currentUser.id}`);

  await userRef
    .update({
      favorites: { ...favorites, [itemToAdd.id]: itemToAdd },
    })
    .catch((error) => {
      console.log("error adding favorite", error.message);
    });
};

export const removeItemFromFavorites = async (
  currentUser,
  itemToRemove,
  favorites
) => {
  const userRef = firestore.collection("users").doc(`${currentUser.id}`);
  const favoritesCopy = { ...favorites };
  delete favoritesCopy[itemToRemove.id];

  await userRef
    .update({
      favorites: { ...favoritesCopy },
    })
    .catch((error) => {
      console.log("error adding favorite", error.message);
    });
  return favoritesCopy;
};

// Add collection (shop.collection) and document objects (shop data) to firestore
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  // 1. Create firestore batch object
  const batch = firestore.batch();

  objectsToAdd.forEach((obj) => {
    // 2. Create a new documentReference object for each category in collection (i.e. decor).
    //    Firestore's .doc() method (without params) will generate random IDs which will also be used for url path
    const newDocRef = collectionRef.doc();
    // 3. Set the value (title and items) for each docRef object by batching the .set() calls together.
    batch.set(newDocRef, obj);
  });

  // Execute batch request, which returns a promise. When .commit() succeeds it will resolve a void (null) value
  return await batch.commit();
};

const extractFirstWord = (string) => string.replace(/ .*/, "").toLowerCase();

export const transformCollectionsData = (collections) => {
  // .docs gives us query snapshot, .data() gives us data from db
  const transformedCollection = collections.docs.map((doc) => {
    const { title, subtitle, items, banner, collectionId } = doc.data();
    // encodeURI - encodes URI by replacing characters that a URL cannot process.
    const routeName = encodeURI(extractFirstWord(title));
    return {
      routeName: routeName,
      id: collectionId,
      title,
      subtitle,
      items,
      banner,
    };
  });
  // Convert array of objects to new object using collection title as property name.
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[extractFirstWord(collection.title)] = collection;
    return accumulator;
  }, {});
};

export const transformCollectionData = (snapshot) => {
  const collectionDoc = snapshot.docs[0];
  if (collectionDoc) {
    const { title, subtitle, items, banner, collectionId } =
      collectionDoc.data();
    const routeName = encodeURI(extractFirstWord(title));

    return {
      [collectionId]: {
        id: collectionId,
        title,
        subtitle,
        items,
        banner,
        routeName,
      },
    };
  }
  return null; // The document isn't found
};

// Promise oriented solution to get userAuth object from auth library that will work with sagas:
//  Once we get userAuth object, immediately unsubscribe using Firebase's unsubscribe() function.
//  Resolve with userAuth object or reject with null
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

// Firebase .auth() method - used for authentication
export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Set up Google authentication utility
export const googleProvider = new firebase.auth.GoogleAuthProvider(); // Gives us access to googleAuthProvider class from auth library

// Trigger Google prompt
googleProvider.setCustomParameters({ prompt: "select_account" });

// signInWithPopup contains popups for several services (sign in with twitter, facebook etc).
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

// Export firebase as default in case we want entire library
export default firebase;
