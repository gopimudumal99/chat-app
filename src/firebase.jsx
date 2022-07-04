// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyBC-_CIHza5Y01aPqAlnxqFLIDHtSjL-IA",
  authDomain: "perichat-5f562.firebaseapp.com",
  projectId: "perichat-5f562",
  storageBucket: "perichat-5f562.appspot.com",
  messagingSenderId: "848108487402",
  appId: "1:848108487402:web:a3df76130f03cf91abcd93"
};

// Initialize Firebase
// export const auth = initializeApp(firebaseConfig).default.getAuth();
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)


export default app