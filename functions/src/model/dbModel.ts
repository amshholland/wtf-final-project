import { ObjectId } from "mongodb";

export interface Truck {
    _id?: ObjectId;
    iGId: number;
    name: string;
    profilePhoto: string;
    profileDescription: string;
    iGHandle: string;
    lastRefresh: number;
    lastLocation: TruckLocation;
    locationHistory: TruckLocation[];
    caption: string;
}

export interface TruckLocation {
    locationName: string;
    photo?: string; // = Version.url[1]
    carouselPhoto?: string;
    timestamp: number;
    lat: number;
    lng: number;
    address: string;
    city: string;
}

// export interface PostCaption {
//     postCaption: string;
// }