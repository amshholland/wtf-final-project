import * as functions from "firebase-functions";

import { MongoClient } from "mongodb";

const uri: string = functions.config().mongodb.uri;
if ( !uri ) {
    console.error( "ERROR: Missing environment variable mongodb.uri." );
}

let client: MongoClient;

export async function getClient(): Promise<MongoClient> {
    // Check if connection exists, if not, reconnect
    if ( !client || !client.isConnected() ) {
        // Establish a connection to the database
        client = await MongoClient.connect( uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } );
        console.debug( "DB CLIENT RECONNECTED" );
    }
    return client;
}