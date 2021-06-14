import * as functions from "firebase-functions";

import { Truck, TruckLocation } from "./model/truckDbModel";

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
            console.log( `handle ${ dbTruck.instagramHandle }` );
            console.log( `IGTruckProfile: ${ apiTruck.full_name }` );
            //update database truck with info from API
            //TODO filter our results first to omit posts with no location ****
            const truckLocations: TruckLocation[] = apiTruck.feed.post.filter( apiPost => {
                if ( apiPost.location === undefined ) {
                    return false;
                }
                return true;
            } ).map( apiPost => {
                const truckLocation: TruckLocation = {
                    locationName: apiPost.location.name || 'undefined',
                    timestamp: apiPost.taken_at,
                    lat: apiPost.location.lat || 0,
                    lng: apiPost.location.lng || 0,
                    address: apiPost.location.address || 'undefined',
                    city: apiPost.location.city || 'undefined'
                };
                console.log( truckLocations );
                return truckLocation;
            } );

        }

        //replace truck in database
        res.send( "done" );
    } catch ( err ) {
        console.log( err );
        res.send( `failed ${ err }` );
    }
} );;