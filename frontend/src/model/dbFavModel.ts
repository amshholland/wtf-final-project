import firebase from "../firebaseConfig";

export interface Favorites {
    _id: firebase.User;
    favoritedTrucks: Favorite[];
}

export interface Favorite {
    truckId: string;
}