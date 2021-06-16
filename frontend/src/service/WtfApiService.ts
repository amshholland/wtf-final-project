import axios from "axios";
import { Truck } from "../model/dbModel";
import trucks from "../components/mongo-clone.json";

// const nodeEnvironment: string = process.env.NODE_ENV || "development";  //for offline development

const baseUrl = process.env.REACT_APP_API_URL || "";
if ( !baseUrl ) {
    console.error( "REACT_APP_API_URL environment variable not set." );
}

export function getTruckData(): Promise<Truck[]> {
    // if (nodeEnvironment === "development") { //for offline development
    //     return Promise.resolve(trucks);
    // }
    return axios.get( baseUrl ).then( res => res.data );
}