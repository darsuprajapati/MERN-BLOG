// Import the functions you need from the SDKs you need
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getEnv } from "./getEnv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: getEnv('VITE_FIREBASE_API'),
    authDomain: "mern-blog-283d1.firebaseapp.com",
    projectId: "mern-blog-283d1",
    storageBucket: "mern-blog-283d1.firebasestorage.app",
    messagingSenderId: "439724200566",
    appId: "1:439724200566:web:b9230bf62d07060f2a8557"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { auth, provider }