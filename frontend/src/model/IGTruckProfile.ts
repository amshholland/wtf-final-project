export default interface IGTruckProfile {
    id?: string;
    pk: number;
    username: string;
    full_name: string;
    profile_pic_url: string;
    biography: string;
    external_url: string;
    contact_phone_number: number;
    instagram_location_id: string;
    is_business: boolean;
    feed: Feed;
}

export interface Feed {
    data: Data[];
}

export interface Data {
    post: Post;
}

export interface Post {
    taken_at: number;
    carousel_media?: Carousel[];  
    location: Location;
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
    candidates: Candidates; 
}

export interface Candidates {
    version: Version;
    //We want the photo version at index 1 (width: 360px, height: 450px)
}

export interface Version {
    url:  string;
}
