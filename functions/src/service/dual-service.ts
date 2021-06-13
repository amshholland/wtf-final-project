import * as functions from "firebase-functions";

import IGTruckProfile from "../model/apiModel";
import axios from "axios";

const rapidapi_key = functions.config().RapidAPI.rapidapi_key;
const url = "https://instagram-bulk-profile-scrapper.p.rapidapi.com/clients/api/ig/bulk_profile";

export function readTruck( handle: string ): Promise<IGTruckProfile> {
  return axios.get( url, {
    params: { response_type: 'full', ig: { handle }, corsEnabled: 'true' },
    headers: {
      'x-rapidapi-key': rapidapi_key,
      'x-rapidapi-host': 'instagram-bulk-profile-scrapper.p.rapidapi.com'
    }
  } ).then( res => res.data[ 0 ] );
}



