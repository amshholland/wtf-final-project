import { BrowserRouter, Route, Router, Switch } from "react-router-dom";
import "./App.css";
import FoodTruckCard from "./components/FoodTruckCard";
import FoodTruckList from "./components/FoodTruckList";
import WrappedMap from "./components/MapComponent";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Where's The Food Trucks?</h1>
      </header>
      <BrowserRouter>
        <Switch>
          <Route path="/list">
            <FoodTruckList />
          </Route>
          <Route path="/">
            <div className="map">
              <WrappedMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}`}
                loadingElement={<div style={{ height: "100%" }} />}
                containerElement={<div style={{ height: "100%" }} />}
                mapElement={<div style={{ height: "100%" }} />}
              />
            </div>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
