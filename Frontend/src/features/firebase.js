import {initializeApp} from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBNOC87G7BwGvoKk_cwnGvwgodecG827nA",
  authDomain: "adsview-163a4.firebaseapp.com",
  projectId: "adsview-163a4",
  storageBucket: "adsview-163a4.firebasestorage.app",
  messagingSenderId: "868636576224",
  appId: "1:868636576224:web:8d623266b7a1a3bcbe4385",
  measurementId: "G-ETHB26MGL8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();