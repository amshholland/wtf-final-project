export default interface IGTruckProfile {
    id?: string;
    pk: number;
    username: string;
    full_name: string;
    profile_pic_url: string;
    biography: string;
    external_url: string;
    contact_phone_number: number;
    feed: Feed;
}

export interface Feed {
    data: Data[];
}

export interface Data {
    taken_at: number;
    carousel_media_count?: number;
    carousel_media?: Carousel[];
    location: Location;
    caption: Caption;
    image_versions2: ImageVersion;
}

export interface Caption {
    text: string;
}

export interface Location {
    name: string;
    short_name: string;
    lat: number;
    lng: number;
    address: string;
    city: string;
}

export interface Carousel {
    image_versions2: ImageVersion;
}

export interface ImageVersion {
    candidates: Candidates[];
}

export interface Candidates {
    url: string;
}
