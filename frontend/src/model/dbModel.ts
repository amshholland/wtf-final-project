export interface Truck {
    _id?: string;
    iGId: number;
    name: string;
    profilePhoto: string;
    profileDescription: string;
    instagramHandle: string;
    lastRefresh: number;
    lastLocation: TruckLocation;
    locationHistory: TruckLocation[];
}

export interface TruckLocation {
    locationName: string;
    photo?: string; // = Version.url[1]
    carouselPhoto?: CarouselPhotos[];
    lat: number;
    lng: number;
    address: string;
    city: string;
    caption: string;
    timestamp: number;
}

export interface CarouselPhotos {
    photo: string;
}