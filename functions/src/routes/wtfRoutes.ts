import * as functions from "firebase-functions";

import { Truck } from "../model/dbModel";
import cors from "cors";
import express from "express";
import { getClient } from '../db';

const app = express();
app.use( cors() );
app.use( express.json() );

app.get( "/", async ( req, res ) => {
    try {
        const client = await getClient();
        const results = await client.db().collection<Truck[]>( 'trucks' ).find().toArray();
        res.json( results ); // send JSON results
    } catch ( err ) {
        console.error( "FAIL", err );
        res.status( 500 ).json( { message: "Internal Server Error" } );
    }
} );


export default functions.https.onRequest( app );