// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  writeBatch,
  getDocs,
  query,
} from "firebase/firestore";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  //signInWithRedirect,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { v4 as uuid } from "uuid";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPJ36Ppnwrvk4ZSNr9BCOU2-V_2-aGJZI",
  authDomain: "inspire-athletics.firebaseapp.com",
  projectId: "inspire-athletics",
  storageBucket: "inspire-athletics.appspot.com",
  messagingSenderId: "344956038295",
  appId: "1:344956038295:web:7b288b18bd55560ac24dd2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore database
export const db = getFirestore(app);

export const modifyProductIDInEachCategory = (productData) => {
  return productData.map((productCategory) => {
    const items = productCategory.items.map((product) => ({
      ...product,
      id: uuid(),
    }));
    return { ...productCategory, items };
  });
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey); // get collection reference
  const batch = writeBatch(db); //// Get a new write batch
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
  console.log("done adding collection");
};

// export const getCategoriesAndDocuments = async () => {
//   const collectionRef = collection(db, "categories");
//   const q = query(collectionRef);
//   const querySnapshot = await getDocs(q);
//   const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
//     const { title, items } = docSnapshot.data();
//     acc[title.toLowerCase()] = items;
//     return acc;
//   }, {});
//   return categoryMap;
// };

/**
 *  Return all categories with their respective items from firebase db
 *
 * */

export const getProductsCatalog = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  const catalog = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
  return catalog;
};

// new google auth instance
const googleProvider = new GoogleAuthProvider();
// google authentication to select acct
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
// export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid); // gets the actual document inside the collection
  const userSnapshot = await getDoc(userDocRef); // gets the data inside the document, aka the "snapshot"
  // console.log(userSnapshot.data());
  // console.log('userAuth', userAuth)
  // await setDoc(userSnapshot, data);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (e) {
      console.log("error creating user", e.message);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  const userAuth = await createUserWithEmailAndPassword(auth, email, password);
  return userAuth;
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  const userAuth = await signInWithEmailAndPassword(auth, email, password);
  return userAuth;
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
