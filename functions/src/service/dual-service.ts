import * as functions from "firebase-functions";

import IGTruckProfile from "../model/truckApiModel";
import axios from "axios";

const key = functions.config().RapidAPI.key;
const host = "https://instagram-bulk-profile-scrapper.p.rapidapi.com/clients/api/ig/bulk_profile";

export function readTruck( handle: string ): Promise<IGTruckProfile> {
  return axios.get( host, {
    params: { ig: handle },
    headers: { "X-RapidApi-Key": key }
  } ).then( res => res.data[ 0 ] );
}