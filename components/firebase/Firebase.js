import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyACGI1DI0CO9SU2Z_yq_kdcEMT17C4ZbJQ",
    authDomain: "mobile-game-yazlab.firebaseapp.com",
    projectId: "mobile-game-yazlab",
    storageBucket: "mobile-game-yazlab.appspot.com",
    messagingSenderId: "928533868950",
    appId: "1:928533868950:web:5f55b94bc366bee14a2db7",
    measurementId: "G-JLJR9CY8PJ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

