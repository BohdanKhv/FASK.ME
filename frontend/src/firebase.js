// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyARL-EgUjuzd95RZh3VfgplKPpClYYDRN0",
    authDomain: "fask-8abe5.firebaseapp.com",
    projectId: "fask-8abe5",
    storageBucket: "fask-8abe5.appspot.com",
    messagingSenderId: "240848943858",
    appId: "1:240848943858:web:0bd9266cde5087dce26e6b",
    measurementId: "G-H7EJ1RQ4H8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);