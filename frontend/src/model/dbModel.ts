export interface Truck {
    _id?: string,
    iGId: number,
    instagramHandle: string,
    name: string,
    profilePhoto: string,
    profileDescription: string,
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