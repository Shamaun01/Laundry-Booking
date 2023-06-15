import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAqHLJV9bS3A2wCkHrekUa1yzMw_Ppaw0A",
  authDomain: "lundry-application-cc52a.firebaseapp.com",
  projectId: "lundry-application-cc52a",
  storageBucket: "lundry-application-cc52a.appspot.com",
  messagingSenderId: "1001654029643",
  appId: "1:1001654029643:web:e3586271cac865180b2cce",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore();

export { auth, db };
