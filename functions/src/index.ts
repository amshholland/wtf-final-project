import * as functions from "firebase-functions";

import { Carousel, ImageVersion } from './model/apiModel';
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
            const apiTruck = await readTruck( dbTruck.iGHandle );

            console.log( apiTruck );
            //update database truck with info from API
            //TODO filter our results first to omit posts with no location ****
            const truckLocations: TruckLocation[] = apiTruck.feed.data.map( apiPost => {

                const truckLocation: TruckLocation = {
                    locationName: apiPost.post.location.name,
                    photo: '', //TODO this shit later
                    timestamp: apiPost.post.taken_at,
                    lat: apiPost.post.location.lat,
                    lng: apiPost.post.location.lng,
                    address: apiPost.post.location.address,
                    city: apiPost.post.location.city,
                };
                console.log( truckLocations );
                return truckLocation;
            } );
            //replace truck in database
        }

        res.send( "done" );
    } catch ( error ) {
        console.log( error );
        res.send( "failed" );
    }
} );

