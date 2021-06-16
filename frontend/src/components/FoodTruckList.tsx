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

  useEffect(() => {
    loadTrucks();
  }, []);

  function loadTrucks() {
    getTruckData().then((trucksFromApi) => {
      setFoodTrucks(trucksFromApi);
      setFoodTrucksLoaded(true);
      console.log(getTruckData());
    });
  }

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
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FoodTruckList;
