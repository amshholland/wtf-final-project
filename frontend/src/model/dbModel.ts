export interface Truck {
    _id?: string;
    iGId: number;
    name: string;
    profilePhoto: string;
    profileDescription: string;
    iGHandle: string;
    lastRefresh: number;
    lastLocation: TruckLocation;
    locationHistory: TruckLocation[];
    photo: TruckPhoto[];
}

export interface TruckLocation {
    locationName: string;
    photo: string;
    timestamp: number;
    lat: number;
    lng: number;
    address: string;
    city: string;
}

export interface TruckPhoto {
    imageSrc: string; // = Version.url[1]
}

export interface PostCaption {
    postCaption: string;
}