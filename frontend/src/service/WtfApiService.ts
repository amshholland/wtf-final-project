import { Favorite, User } from "../model/dbFavModel";

import { AuthContext } from './../context/auth-context';
import { Truck } from "../model/dbModel";
import axios from "axios";

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


export function createUser( _id: string ): Promise<User> {
    return axios.post( baseUrl ).then( res => res.data );
}

//TODO: get this collection in db and correctly call it when list is mounted FROM favorites link
export function postFavorite( favorite: Favorite ): Promise<Favorite> {
    return axios.post( baseUrl ).then( res => res.data );
}

export function getUserFavorites( _id: string ): Promise<Favorite[]> | null {
    return axios.get( baseUrl, {
        params: { _id: _id }
    } ).then( res => res.data );
}