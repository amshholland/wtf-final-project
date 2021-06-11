import { ObjectId } from "mongodb";

export default interface IGTruckProfile {
    id?: ObjectId;
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
}

export interface Version {
    
}


// export default interface Data {
//     0?:
//     taken_at: number;
//     carousel_media: [

//     ];
//     image_versions2" {;
// candidates: [
//     1: {
//         url: string;
//     }
// ];
// 1 ?:
//     taken_at: number;
// carousel_media: [

// ];
// image_versions2" {;
// candidates: [
//     1: {
//         url: string;
//     }
// ];
// 2 ?:
//     taken_at: number;
// carousel_media: [

// ];
// image_versions2" {;
// candidates: [
//     1: {
//         url: string;
//     }
// ]

//             }
// ];
// };
// }
