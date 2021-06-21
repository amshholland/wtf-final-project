import firebase from "../firebaseConfig";

export interface User {
    _id: string;
    favorites: Favorite[];
}

export interface Favorite {
    truckId: string;
}