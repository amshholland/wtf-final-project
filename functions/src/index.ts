import * as functions from "firebase-functions";

import { Truck, TruckLocation } from "./model/dbModel";

import { getClient } from "./db";
import { readTruck } from "./service/dual-service";

export { default as wtf } from "./routes/wtfRoutes";

// exports.scheduledFunction = functions.pubsub.schedule('every 30 minutes').onRun((context) => {
exports.scheduledFunction = functions.https.onRequest( async ( req, res ) => {
    console.log( 'This will be run every 30 minutes!' );
    //step 1: get trucks from database that need to be updated
    const client = await getClient();
    const trucksFromDb = await client.db().collection<Truck>( 'trucks' ).find().limit( 1 ).toArray();
    for ( let dbTruck of trucksFromDb ) {
        //get matching truck from API
        // const apiTruck = await readTruck( dbTruck.instagramHandle );
        const apiTruck = await readTruck( 'amshholland' );

        //update database truck with info from API
        //TODO filter our results first to omit posts with no location ****
        apiTruck.feed.data.filter( function ( apivalue, apikey ) {

            if ( apivalue.location === undefined ) {
                return false;
            }
            return true;

        } ).map( apiPost => {

            let postPhoto: string = '';
            if ( apiPost.carousel_media === undefined ) {
                postPhoto = apiPost.image_versions2.candidates[ 1 ].url;
                console.log( `single image: ${ postPhoto }` );
            } else {
                apiPost.carousel_media?.map( media => {
                    // if carousel.mediatype !== 1, skip somehow
                    if ( media.media_type !== 1 ) {
                        return false;
                    }
                    postPhoto = media.image_versions2.candidates[ 1 ].url;
                    return true;
                } );
                console.log( `carousel image: ${ postPhoto }` );

            };

            const truckLocation: TruckLocation = {
                locationName: apiPost.location.name || '',
                photo: postPhoto,
                timestamp: apiPost.taken_at,
                lat: apiPost.location.lat || 0,
                lng: apiPost.location.lng || 0,
                address: apiPost.location.address || '',
                city: apiPost.location.city || '',
                caption: apiPost.caption.text || ''
            };
            return truckLocation;
        } );
        dbTruck.lastRefresh = Date.now();
        //replace truck in database
        try {
            const client = await getClient();
            const result = await client.db().collection<Truck>( 'trucks' ).insertOne( dbTruck );
            dbTruck._id = result.insertedId;
            res.status( 201 ).json( dbTruck );
        } catch ( err ) {
            console.error( "FAIL", err );
            res.status( 500 ).json( { message: "Internal Server Error" } );
        }
    }
} );