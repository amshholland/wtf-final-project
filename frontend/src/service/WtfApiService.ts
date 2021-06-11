import IGTruckProfile from "../model/IGTruckProfile";
import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL || "";
if ( !baseUrl ) {
    console.error( "REACT_APP_API_URL environment variable not set." );
}