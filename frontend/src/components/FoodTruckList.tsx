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
        getTruckData().then(trucksFromApi => {
            setFoodTrucks(trucksFromApi);
            setFoodTrucksLoaded(true);
        });
    }

    return (
        <div className="FoodTruckList">
            <h1>Food Trucks</h1>
            {!foodTrucksLoaded ? 
                <p>Loading...</p> : 
                foodTrucks.length === 0 ? 
                <p>No Food Trucks available.</p> :
                // foodTrucks.map(eachTruck =>   //NOT WORKING because foodTrucks is coming back as HTML code
                //     <FoodTruckCard key={eachTruck._id} truck={eachTruck}/>)
                <p>{foodTrucks}</p>
            }
        </div>
    )
}

export default FoodTruckList;