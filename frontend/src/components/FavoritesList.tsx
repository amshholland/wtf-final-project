import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../context/auth-context";
import { Favorite } from "../model/dbFavModel";
import { FavoriteContext } from "../context/favorite-context";
import FoodTruckList from "./FoodTruckList";
import { Lists } from "./Lists";
import { Truck } from "../model/dbModel";
import { getTruckData } from "../service/WtfApiService";
import { useParams } from "react-router-dom";

function FavoritesList() {

    const [ foodTrucks, setFoodTrucks ] = useState<Truck[]>( [] );
    const [ foodTrucksLoaded, setFoodTrucksLoaded ] = useState( false );
    const [ foodTruck, setFoodTruck ] = useState<Truck | null>( null );

    const { user } = useContext( AuthContext );
    console.log( `favorite Button ${ user?.uid }` );
    const { favorites, addFavorite, removeFavorite } = useContext( FavoriteContext );

    useEffect( () => {
        loadTrucks();
    }, [] );

    function loadTrucks() {
        getTruckData().then( ( trucksFromApi ) => {
            setFoodTrucks( trucksFromApi );
            setFoodTrucksLoaded( true );
        } );
    }

    let trucks: Truck[] = [];
    let favs: Truck[] = [];

    favorites.forEach( fav => favs = foodTrucks.filter( truckId => truckId.iGId === fav.truckId ) );

    return (
        <Lists trucks={ favs } />
    );
};
