import * as functions from "firebase-functions";

import { Truck, TruckLocation } from "./model/dbModel";

import { getClient } from "./db";
import { readTruck } from "./service/dual-service";

export { default as wtf } from "./routes/wtfRoutes";

// exports.scheduledFunction = functions.pubsub.schedule('every 30 minutes').onRun((context) => {
exports.scheduledFunction = functions.https.onRequest( async ( req, res ) => {
    // console.log( 'This will be run every 30 minutes!' );
    try {
        // Get trucks from database that need to be updated
        // Connecting to MongoDB
        const client = await getClient();
        const collection = client.db().collection<Truck>( 'trucks' );
        const trucksFromDb = await collection.find().toArray();

        // Iterate through each truck
        for ( let dbTruck of trucksFromDb ) {
            // Use trucks from DB to search 3rd party API by IG handle
            const apiTruck = await readTruck( dbTruck.instagramHandle );

            // Filter our results first to omit posts with no location
            const locationHistory = apiTruck.feed.data.filter( function ( apivalue, apikey ) {

                if ( apivalue.location === undefined ) {
                    return false;
                }
                return true;

            } ).map( apiPost => {

                // Determine whether post is a carousel of images or a single image
                let postPhoto: string = '';
                if ( apiPost.carousel_media === undefined ) {
                    postPhoto = apiPost.image_versions2.candidates[ 0 ].url;
                } else {
                    apiPost.carousel_media?.map( media => {
                        // Check to see if media type is different than a photo
                        // If so, do not include in results
                        if ( media.media_type !== 1 ) {
                            return false;
                        }
                        postPhoto = media.image_versions2.candidates[ 1 ].url;
                        return true;
                    } );
                };

                const truckLocation: TruckLocation = {
                    locationName: apiPost.location.name || '',
                    photo: postPhoto,
                    timestamp: apiPost.taken_at,
                    lat: apiPost.location.lat || 0,
                    lng: apiPost.location.lng || 0,
                    address: apiPost.location.address || '',
                    city: apiPost.location.city || '',
                    // caption: apiPost.caption.text || undefined
                };
                // Use all data pulled from DB, update lastLocation and locationHistory(push) with truck location
                // In the future, when locationHistory is used, consider using timestamp or post ID to determine whether to push to locationHistory
                console.log( apiPost.location.name, postPhoto,
                    apiPost.taken_at,
                    apiPost.location.lat,
                    apiPost.location.lng,
                    apiPost.location.address,
                    apiPost.location.city,
                    // apiPost.caption.text 
                );

                return truckLocation;
            } );

                dbTruck.iGId = apiTruck.pk;
                dbTruck.name = apiTruck.full_name;
                dbTruck.profilePhoto = apiTruck.profile_pic_url;
                dbTruck.profileDescription = apiTruck.biography;
                dbTruck.instagramHandle = dbTruck.instagramHandle;
                dbTruck.lastRefresh = Date.now();
                dbTruck.lastLocation = locationHistory[ 0 ];
                dbTruck.locationHistory = locationHistory;

            // In replaceOne: {_id: dbTruck._id} acts as a filter 
            // dbTruck acts as the replacement
            console.log( dbTruck );
            console.log(await collection.replaceOne( { _id: dbTruck._id }, dbTruck ));
        }
        res.send( "done" );
    } catch ( err ) {
        console.log( err );
        res.send( "failed" );
    }
} );