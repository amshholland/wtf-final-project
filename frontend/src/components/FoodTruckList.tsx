import { useEffect, useState } from "react";
import { Truck } from "../model/dbModel";
import FoodTruckCard from "./FoodTruckCard";
import "./FoodTruckList.css";
import { getTruckData } from "../service/WtfApiService";
import { Link, useHistory, useParams } from "react-router-dom";

function FoodTruckList() {
  const history = useHistory();
  history.push("/list");

  const [foodTrucks, setFoodTrucks] = useState<Truck[]>([]);
  const [foodTrucksLoaded, setFoodTrucksLoaded] = useState(false);
//-----------------------------------------------------------------------------------
  let unix_timestamp = 1549312452;
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  let date = new Date(unix_timestamp * 1000);
  // Hours part from the timestamp
  let hours = date.getHours();
  // Minutes part from the timestamp
  let minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  let seconds = "0" + date.getSeconds();

  // Will display time in 10:30:23 format
  let formattedTime =
    hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
//------------------------------------------------------------------------------------

  useEffect(() => {
    loadTrucks();
  }, []);

  function loadTrucks() {
    getTruckData().then((trucksFromApi) => {
      setFoodTrucks(trucksFromApi);
      setFoodTrucksLoaded(true);
    });
  }
  console.log(foodTrucks);
  return (
    <div className="FoodTruckList">
      <header>
        <h1>Food Trucks</h1>
      </header>
      {!foodTrucksLoaded ? (
        <p id="loading">Loading...</p>
      ) : foodTrucks.length === 0 ? (
        <p>No Food Trucks available.</p>
      ) : (
        <ul>
          {foodTrucks.map((truckInList) => (
            <Link to="/card">
              <li id="truckNameInList">
                <p id="name">{truckInList.name}</p>
                <p id="igHandle">{`@${truckInList.instagramHandle}`}</p>
                <p id="timestamp">{truckInList.lastLocation.timestamp}</p>
              </li>
            </Link>
          ))}
        </ul>
      )}
      <Link to="/">
        <button>Map View</button>
      </Link>
    </div>
  );
}

export default FoodTruckList;
