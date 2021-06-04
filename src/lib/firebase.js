import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// import { seedDatabase } from "../seed";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "instagram-clone-moienian.firebaseapp.com",
  projectId: "instagram-clone-moienian",
  storageBucket: "instagram-clone-moienian.appspot.com",
  messagingSenderId: "545686661620",
  appId: "1:545686661620:web:25d582d498ad155d9a71a1",
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

/* Run once!!! */
// seedDatabase(firebase);

export { firebase, FieldValue };
