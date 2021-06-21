import { ObjectId } from "mongodb";

export interface Favorites {
    _id: ObjectId;
    userId: string;
    truckId: string;
}