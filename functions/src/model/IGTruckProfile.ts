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
    latitude: number;
    longitude: number;
    instagram_location_id: string;
    is_business: boolean;
    feed: {};
}

export default interface Feed {
    data: [];
}

export default interface Data {
    0?:
    taken_at: number;
    carousel_media: [

    ];
    image_versions2" {;
candidates: [
    1: {
        url: string;
    }
];
1 ?:
    taken_at: number;
carousel_media: [

];
image_versions2" {;
candidates: [
    1: {
        url: string;
    }
];
2 ?:
    taken_at: number;
carousel_media: [

];
image_versions2" {;
candidates: [
    1: {
        url: string;
    }
]

            }
];
};
}
