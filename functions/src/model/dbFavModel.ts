import { ObjectId } from "mongodb";

export interface Favorites {
    _id: ObjectId;
    userId: string;
    favorites: Favorite[];
}

export interface Favorite {
    truckId: string;
}