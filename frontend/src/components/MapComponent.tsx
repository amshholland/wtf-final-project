import "./MapComponent.css";
import { GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function MapComponent() {
  const history = useHistory();
  history.push("/map");
  
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
            window.removeEventListener("keydown", listener);
          };
        }, []);

        return (
          <GoogleMap
            defaultZoom={10}
            defaultCenter={{ lat: 42.3314, lng: 83.0458 }}
          />
        );
      }}
    </div>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(MapComponent));

export default MapComponent;
