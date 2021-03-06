import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAEbnBXblPhgEN52P7FTm8F7Xts9vUF2BM",
    authDomain: "netflix-clone-3970d.firebaseapp.com",
    projectId: "netflix-clone-3970d",
    storageBucket: "netflix-clone-3970d.appspot.com",
    messagingSenderId: "961195395470",
    appId: "1:961195395470:web:2700e5c91a9c8335d33cdf"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth }
export default db;