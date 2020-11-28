import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2unqX24kaldi-0yAK0VJnsA3k2-0jc0I",
  authDomain: "react-firebase-chatapp-708bb.firebaseapp.com",
  databaseURL: "https://react-firebase-chatapp-708bb.firebaseio.com",
  projectId: "react-firebase-chatapp-708bb",
  storageBucket: "react-firebase-chatapp-708bb.appspot.com",
  messagingSenderId: "401241439839",
  appId: "1:401241439839:web:2193c41613daa0bfc2a5ea",
  measurementId: "G-ZE12YR5TF8",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

export default firebase;
