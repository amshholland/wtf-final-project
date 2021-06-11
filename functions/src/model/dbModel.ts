import { ObjectId } from "mongodb";

export interface Truck {
    _id?: ObjectId,
    iGId: number,
    name: string,
    profilePhoto: string,
    profileDescription: string,
    instagramHandle: string,
    lastRefresh: number,
    lastLocation: TruckLocation;
    locationHistory: TruckLocation[];
}

export interface TruckLocation {
    locationName: string,
    photo: string,
    timestamp: number,
    lat: number,
    lng: number;
}