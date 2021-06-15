import * as functions from "firebase-functions";

import { Truck, TruckLocation } from "./model/dbModel";

import { getClient } from "./db";
import { readTruck } from "./service/dual-service";

export { default as wtf } from "./routes/wtfRoutes";

// exports.scheduledFunction = functions.pubsub.schedule('every 30 minutes').onRun((context) => {
exports.scheduledFunction = functions.https.onRequest( async ( req, res ) => {
    console.log( 'This will be run every 30 minutes!' );
    try {
        //step 1: get trucks from database that need to be updated
        const client = await getClient();
        const trucksFromDb = await client.db().collection<Truck>( 'trucks' ).find().limit( 1 ).toArray();
        for ( let dbTruck of trucksFromDb ) {
            //get matching truck from API
            const apiTruck = await readTruck( dbTruck.instagramHandle );
            //update database truck with info from API
            //TODO filter our results first to omit posts with no location ****
            apiTruck.feed.data.filter( function ( apivalue, apikey ) {

                if ( apivalue.location === undefined ) {
                    return false;
                }
                return true;

            } ).map( apiPost => {

                let postPhoto: string = '';

                if ( apiPost.carousel_media_count === undefined ) {
                    apiPost.image_versions2?.candidates.map( candidate => {
                        postPhoto = candidate.version.url;
                        console.log( postPhoto );
                    } );
                } else {
                    apiPost.carousel_media?.map( media => {
                        media.image_versions2.candidates.map( candidate => {
                            postPhoto = candidate.version.url;
                            console.log( postPhoto );
                        } );
                    } );
                }

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

                console.log( postPhoto );
                // console.log( truckLocation );
                return truckLocation;
            } );

            dbTruck.lastRefresh = Date.now();
        }


        //replace truck in database

        res.send( "done" );
    } catch ( err ) {
        console.log( err );
        res.send( "failed" );
    }
} );
