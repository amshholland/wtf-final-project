import IGTruckProfile from "../../../functions/src/model/apiModel";
import axios from "axios";
import dbItem from 'json!../public/truck.json';

const apiKey: string = process.env.API_KEY || "";

const baseUrl = process.env.REACT_APP_API_URL || "";
if ( !baseUrl ) {
    console.error( "REACT_APP_API_URL environment variable not set." );
}

export function getTruckData(): Promise<IGTruckProfile[]> {
    return axios.get( baseUrl ).then( res => res.data );
}

export function createTruck( truckDB: TruckDB ): Promise<TruckDB> {
    return axios.post( baseUrl, truckDB ).then( res => res.data );
}