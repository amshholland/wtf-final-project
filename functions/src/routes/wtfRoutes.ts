import * as functions from "firebase-functions";

import { Favorites } from "../model/dbFavModel";
import { ObjectId } from "mongodb";
import { Truck } from "../model/dbModel";
import cors from "cors";
import express from "express";
import { getClient } from '../db';

const app = express();
app.use( cors() );
app.use( express.json() );

// Get food trucks
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

// List favorites
app.get( "/favorites", async ( req, res ) => {
    const userId = String( req.query.userId || '' );
    console.log( 'HI' );
    console.log( userId );
    try {
        const client = await getClient();
        const results = await client.db().collection<Favorites>( 'favorites' ).find( { userId: userId } ).toArray();
        res.json( results );
    } catch ( err ) {
        console.error( "FAIL", err );
        res.status( 500 ).json( { message: "Internal Server Error" } );
    }
} );

// Add new favorite
app.post( "/", async ( req, res ) => {
    const newFavorite = req.body as Favorites;
    console.log( newFavorite );
    try {
        const client = await getClient();
        const results = await client.db().collection<Favorites>( 'favorites' ).insertOne( newFavorite );
        res.json( results );
    } catch ( err ) {
        console.error( "FAIL", err );
        res.status( 500 ).json( { message: "Internal Server Error" } );
    }
} );

// Delete favorite
app.delete( "/:id", async ( req, res ) => {
    const id = req.params.id;
    try {
        const client = await getClient();
        const result = await client.db().collection<Favorites>( 'favorites' ).deleteOne( { _id: new ObjectId( id ) } );
        if ( result.deletedCount === 0 ) {
            res.status( 404 ).json( { message: "Not Found" } );
        } else {
            res.status( 204 ).end();
        }
    } catch ( err ) {
        console.error( "FAIL", err );
        res.status( 500 ).json( { message: "Internal Server Error" } );
    }
} );

export default functions.https.onRequest( app );