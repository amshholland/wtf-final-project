import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import FoodTruckList from "./components/FoodTruckList";
import Header from "./components/Header";
import WrappedMap from "./components/MapComponent";

// import { FavoriteContextProvider } from "./context/favorite-context.txt";

function App() {
  return (
    <div className="App">
      <div className="landing">
        <Header />
        <div className="map" id="map">
          <WrappedMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}`}
            loadingElement={<div style={{ height: "100%" }} />}
            containerElement={<div style={{ height: "100%" }} />}
            mapElement={<div style={{ height: "100%" }} />}
          />
          <div className="fade"></div>
        </div>
      </div>
      <FoodTruckList />
    </div>
  );
}

export default App;
