export interface Truck {
    _id?: Id;
    iGId: number;
    name: string;
    profilePhoto: string;
    profileDescription: string;
    instagramHandle: string;
    // lastRefresh: number;
    // lastLocation: TruckLocation;
    // locationHistory: TruckLocation[];
    // caption: string;
}

export interface Id {
    $oid: string;
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
