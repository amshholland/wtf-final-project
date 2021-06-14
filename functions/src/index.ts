import * as functions from "firebase-functions";

import { Truck, TruckLocation } from "./model/truckDbModel";

import cors from "cors";
import express from "express";
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
            let date = new Date();

            const truckLocations: TruckLocation = apiTruck.feed.post.filter( apiPost => {
                // Do not include trucks without locations
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

                // Put in map because caption is in post
                const truck: Truck = {
                    iGId: apiTruck.pk,
                    name: apiTruck.full_name,
                    profilePhoto: apiTruck.profile_pic_url,
                    profileDescription: apiTruck.biography,
                    instagramHandle: apiTruck.username,
                    lastRefresh: date.getTime(),
                    lastLocation: truckLocation,
                    caption: apiPost.caption.text
                };


                console.log( truckLocation );
                return truckLocation;
            } );
        }
        const app = express();

        app.use( cors() );

        app.post( "/", async ( req, res ) => {
            const truck = req.body as Truck;
            try {
                const client = await getClient();
                const result = await client.db().collection<Truck>( 'trucks' ).insertOne( truck );
                truck._id = result.insertedId;
                res.status( 201 ).json( truck );
            } catch ( err ) {
                console.error( "FAIL", err );
                res.status( 500 ).json( { message: "Internal Server Error" } );
            }
        } );

        res.send( "done" );
    } catch ( err ) {
        console.log( err );
        res.send( "failed" );
    }
} );

// comment to push for Patrick