import './Map.css';
import {GoogleMap, withGoogleMap, withScriptjs} from "react-google-maps";
import { useState, useEffect } from 'react';

interface Props {
    googleMapURL: string;
    loadingElement: string;
    containerElement: string;
    mapElement: string;
}

function MapComponent({ googleMapURL, loadingElement, containerElement, mapElement }: Props) {
     return (
         <div className="MapComponent">
                 {function Map() {
                    const [selectedTruckPin, setSelectedTruckPin] = useState(null);

                    useEffect(() => {
                        const listener = (e) => {
                            if (e.key === "Escape") {
                                setSelectedTruckPin(null);
                            }
                        };
                        window.addEventListener("keydown", listener);

                        return () => {
                            window.removeEventListener("keydown", listener)
                        };
                    }, [])


                return <GoogleMap 
                defaultZoom={10} 
                defaultCenter={{lat: 42.3314, lng: 83.0458}}
                />
                }}
         </div>
     )
}

const WrappedMap = withScriptjs(withGoogleMap(MapComponent));

export default WrappedMap;


googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}`};
loadingElement={<div style={{ height: "100%"}} />};
containerElement={<div style={{ height: "100%"}} />};
mapElement={<div style={{ height: "100%"}} />};