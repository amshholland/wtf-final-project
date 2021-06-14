import { Truck } from "../model/truckDbModel";
import axios from "axios";

const apiKey: string = process.env.API_KEY || "";

const baseUrl = process.env.REACT_APP_API_URL || "";
if ( !baseUrl ) {
    console.error( "REACT_APP_API_URL environment variable not set." );
}

export function getTruckData(): Promise<Truck[]> {
    return axios.get( baseUrl ).then( res => res.data );
}