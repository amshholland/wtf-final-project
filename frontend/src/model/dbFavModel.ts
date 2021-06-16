import { Truck } from "./dbModel";
import firebase from "../firebaseConfig";

export default interface Favorite {
    _id: firebase.User;
    favoritedTrucks: Truck[];
}