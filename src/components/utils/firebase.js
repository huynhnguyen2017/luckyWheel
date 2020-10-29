// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAUK7wbDlwVJBuIsXFdxiNW3q3a8rcaZNY",
  authDomain: "luckywheel-e0bd7.firebaseapp.com",
  databaseURL: "https://luckywheel-e0bd7.firebaseio.com",
  projectId: "luckywheel-e0bd7",
  storageBucket: "luckywheel-e0bd7.appspot.com",
  messagingSenderId: "686055839926",
  appId: "1:686055839926:web:dee3d238eaf61373026e17",
  measurementId: "G-47P5LMELNX"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);

  firebase.analytics();
}

const storage = firebase.storage();
const database = firebase.database();
var firestore = firebase.firestore();

export { storage, database, firestore, firebase }