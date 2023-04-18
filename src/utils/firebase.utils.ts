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
  QueryDocumentSnapshot,
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
  User,
  NextOrObserver,
} from "firebase/auth";

// import { v4 as uuid } from "uuid";
import { Category } from "../store/product-catalog/product-catalog.types";

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

// export const modifyProductIDInEachCategory = (productData: CategoryWithID) => {
//   return productData.map((productCategory) => {
//     const items = productCategory.items.map((product) => ({
//       ...product,
//       id: uuid(),
//     }));
//     return { ...productCategory, items };
//   });
// };

export type ObjectToAdd = {
  title: string;
}

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectsToAdd: T[]
): Promise<void> => {
  const collectionRef = collection(db, collectionKey); // get collection reference
  const batch = writeBatch(db); //// Get a new write batch
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
  console.log("done batch adding collection");
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
export const getProductsCategories = async (): Promise<Category[]> => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  // return the documents within the collection from firebase
  return querySnapshot.docs.map(docSnapshot => docSnapshot.data() as Category)
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


export type AdditionalInformation = {
  displayName?: string;
}

export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
}

export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInformation = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid); // gets the actual document inside the collection
  const userSnapshot = await getDoc(userDocRef); // gets the data inside the document, aka the "snapshot"
  console.log(userSnapshot)

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    const accountType = "USER"
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        accountType,
        ...additionalInformation,
      });
    } catch (e) {
      console.log("error creating user", e);
    }
  }
  return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;
  const userAuth = await createUserWithEmailAndPassword(auth, email, password);
  return userAuth;
};

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;
  const userAuth = await signInWithEmailAndPassword(auth, email, password);
  console.log(userAuth.user.uid)
  const userInCollection = await getUserByUid(userAuth.user.uid)
  console.log({ ...userAuth, ...userInCollection })
  return { ...userAuth, ...userInCollection };
};

export const getUserByUid = async (uid: string) => {
  try {
    const userRef = doc(db, "users", uid);
    const userSnapshot = await getDoc(userRef);
    if (userSnapshot.exists()) {
      return userSnapshot.data();
    } else {
      console.log("No user document found for uid: ", uid);
    }
  } catch (err) {
    console.error("Error retrieving user document: ", err)
  }
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);
