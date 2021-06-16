import "./MapComponent.css";
import {
  GoogleMap,
  InfoWindow,
  withGoogleMap,
  withScriptjs,
} from "react-google-maps";
import { useState, useEffect, ReactElement } from "react";
import Marker from "react-google-maps/lib/components/Marker";
import { Truck, TruckLocation } from "../model/dbModel";
import { Link } from "react-router-dom";
import { getTruckData } from "../service/WtfApiService";
import mapStyles from './snazzy-map-style';

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

  useEffect(() => {
    loadTrucks();
  }, []);

  function loadTrucks() {
    getTruckData().then((trucksFromApi) => {
      setFoodTrucks(trucksFromApi);
    });
  }

  const [selectedTruckPin, setSelectedTruckPin] = useState<any>(undefined);
  const [foodTrucks, setFoodTrucks] = useState<Truck[]>([]);


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
    <div className="mapComponent">
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 42.3314, lng: -83.0458 }}
        defaultOptions={{ styles: mapStyles }}
      >
        {foodTrucks.map((truck) => (
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
              // scaledSize: new window.google.maps.Size(25, 25)
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

      <Link to="/list"><button>List View</button></Link>
    </div>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(MapComponent));

export default WrappedMap;

// TODO: where to put these props
// googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}`};
// loadingElement={<div style={{ height: "100%"}} />};
// containerElement={<div style={{ height: "100%"}} />};
// mapElement={<div style={{ height: "100%"}} />};
