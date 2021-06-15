import { useEffect, useState } from "react";
import { Truck } from "../model/dbModel";
import FoodTruckCard from "./FoodTruckCard";
import "./FoodTruckList.css";
import { getTruckData } from "../service/WtfApiService";

function FoodTruckList() {
  const [foodTrucks, setFoodTrucks] = useState<Truck[]>([]);
  const [foodTrucksLoaded, setFoodTrucksLoaded] = useState(false);

  useEffect(() => {
    loadTrucks();
  }, []);

  function loadTrucks() {
    getTruckData().then((trucksFromApi) => {
      setFoodTrucks(trucksFromApi);
      setFoodTrucksLoaded(true);
    });
  }

  return (
    <div className="FoodTruckList">
      <header>
        <h1>Food Trucks</h1>
      </header>
      {!foodTrucksLoaded ? (
        <p>Loading...</p>
      ) : foodTrucks.length === 0 ? (
        <p>No Food Trucks available.</p>
      ) : (
        <ul>
          {foodTrucks.map((truckInList) => (
            <li id="truckNameInList">{truckInList.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FoodTruckList;
