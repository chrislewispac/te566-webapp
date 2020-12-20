import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";

const fbConfig = {};

// Initialize firebase instance
export const myFirebase = firebase.initializeApp(fbConfig);
