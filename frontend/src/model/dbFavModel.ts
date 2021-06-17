import { Truck } from "./dbModel";
import firebase from "../firebaseConfig";

export interface Favorite {
    _id: firebase.User;
    favoritedTrucks: Truck[];
}