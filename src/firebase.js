import { ExpansionPanel } from '@material-ui/core';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBBzZcDMmVKM3AFq9tALN6UnFhL0wPH8fI",
    authDomain: "whatsup-8ff34.firebaseapp.com",
    projectId: "whatsup-8ff34",
    storageBucket: "whatsup-8ff34.appspot.com",
    messagingSenderId: "403858704402",
    appId: "1:403858704402:web:1f5307974cc6dc753230cb",
    measurementId: "G-5ECHL0GPNW"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db =firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;