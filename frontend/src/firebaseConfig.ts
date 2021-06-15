import firebase from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBwu8n9zvqNkx6DeJkTJ2McjV7braCJmp4",
    authDomain: "wtf-truck.firebaseapp.com",
    projectId: "wtf-truck",
    storageBucket: "wtf-truck.appspot.com",
    messagingSenderId: "740528849850",
    appId: "1:740528849850:web:24e206d6c8a6f755ce9383"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const authProvider = new firebase.auth.GoogleAuthProvider();

export function signInWithGoogle(): void {
    firebase.auth().signInWithPopup(authProvider);
}
export function signOut(): void {
    firebase.auth().signOut();
}

export default firebase;