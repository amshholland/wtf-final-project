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
    caption: string;
}

export interface TruckLocation {
    locationName: string;
    photo?: string; // = Version.url[1]
    carouselPhoto?: string;
    lat: number;
    lng: number;
    address: string;
    city: string;
}

// export interface PostCaption {
//     caption: string;
// }