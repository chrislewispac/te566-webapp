import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";

//TODO: move to env file
const fbConfig = {
  apiKey: "AIzaSyDXUh0aHBgUeJnJtuk36mlvKJlWm3CrHSk",
  authDomain: "te566-3775d.firebaseapp.com",
  databaseURL: "https://te566-3775d.firebaseio.com",
  projectId: "te566-3775d",
  storageBucket: "te566-3775d.appspot.com",
  messagingSenderId: "598528548691",
  appId: "1:598528548691:web:3ff7a15c1ff0b94d5a0ba6",
};

// Initialize firebase instance
export const myFirebase = firebase.initializeApp(fbConfig);
