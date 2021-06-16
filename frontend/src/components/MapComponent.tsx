import "./MapComponent.css";
import {
  GoogleMap,
  InfoWindow,
  withGoogleMap,
  withScriptjs,
} from "react-google-maps";
import { useState, useEffect, ReactElement } from "react";
import Marker from "react-google-maps/lib/components/Marker";
import * as trucksData from "../components/mongo-clone.json";
import { Truck, TruckLocation } from "../model/dbModel";

interface Props {
  googleMapURL: string;
  loadingElement: ReactElement;
  containerElement: ReactElement;
  mapElement: ReactElement;
}

//TODO: how to get info about location from db to put into map marker

function MapComponent({
  googleMapURL,
  loadingElement,
  containerElement,
  mapElement,
}: Props) {
  const [selectedTruckPin, setSelectedTruckPin] = useState<any>(undefined);
  useEffect(() => {
    const listener = (e: { key: string }) => {
      if (e.key === "Escape") {
        setSelectedTruckPin(undefined);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 42.3314, lng: 83.0458 }}
      // defaultOptions={{ styles: mapStyles }} add a style js file from snazzy maps
    >
      {trucksData.trucks.map((truck) => (
        <Marker
          key={truck.iGId}
          position={{
            lat: truck.lastLocation.lat,
            lng: truck.lastLocation.lng,
          }}
          onClick={() => {
            setSelectedTruckPin(truck);
          }}
          icon={{
            url: truck.profilePhoto,
            scaledSize: new window.google.maps.Size(25, 25)
          }}
        />
      ))}

      {
        // unsure if this infowindow serves same purpose as our card component
      }
      {selectedTruckPin && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedTruckPin(null);
          }}
          position={{
            lat: selectedTruckPin.lastLocation.lat,
            lng: selectedTruckPin.lastLocation.lng,
          }}
        >
          <div>
            <h2>{selectedTruckPin.name}</h2>
            <p>{selectedTruckPin.profileDescription}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(MapComponent));

export default WrappedMap;

// TODO: where to put these props
// googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}`};
// loadingElement={<div style={{ height: "100%"}} />};
// containerElement={<div style={{ height: "100%"}} />};
// mapElement={<div style={{ height: "100%"}} />};
