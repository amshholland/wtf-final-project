import "./FoodTruckList.css";

import { Button, Modal } from "react-bootstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../context/auth-context";
import { FavoriteButton } from "./FavoriteButton";
import FoodTruckCard from "./FoodTruckCard";
import { Lists } from "./Lists";
import { Truck } from "../model/dbModel";
import { getTruckData } from "../service/WtfApiService";

// import { FavoriteContext } from "../context/favorite-context.txt";




function FoodTruckList() {
  const { user } = useContext( AuthContext );

  const history = useHistory();
  history.push( "/list" );

  // const { favorites } = useContext( FavoriteContext );
  // For each truck, search through favorite array to find same id
  // array.some -- looks for certain callback 

  const [ foodTrucks, setFoodTrucks ] = useState<Truck[]>( [] );
  const [ foodTrucksLoaded, setFoodTrucksLoaded ] = useState( false );
  const [ foodTruck, setFoodTruck ] = useState<Truck | null>( null );
  // thinking we just use setFoodTrucks to put either favs or list trucks in
  // const [favoriteTrucks, setFavoriteTrucks] = useState<Truck[]>([]);

  useEffect( () => {
    loadTrucks();
  }, [] );

  function loadTrucks() {
    getTruckData().then( ( trucksFromApi ) => {
      setFoodTrucks( trucksFromApi );
      setFoodTrucksLoaded( true );
    } );
  }



  return (
    <Lists trucks={ foodTrucks } />
  );
}

export default FoodTruckList;
