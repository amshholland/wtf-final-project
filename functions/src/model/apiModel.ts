export default interface IGTruckProfile {
    id?: string;
    pk: number;
    username: string;
    full_name: string;
    profile_pic_url: string;
    biography: string;
    external_url: string;
    contact_phone_number: number;
    feed: {
        [ key: string ]: Feed; // object
    };
}

export interface Feed {
    data: Data[];
}

export interface Data {
    post: Post;
}

export interface Post {
    taken_at: number;
    media_type: number;
    carousel_media?: Carousel[];
    location: Location;
    caption: Caption;
    image_versions2?: ImageVersion;
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
    version: Version; //We want the photo version at index 1 (width: 360px, height: 450px)
}

export interface Version {
    url: string;
}