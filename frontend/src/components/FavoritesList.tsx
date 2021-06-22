import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../context/auth-context";
import { Favorite } from "../model/dbFavModel";
import { FavoriteContext } from "../context/favorite-context";
import { useParams } from "react-router-dom";
import FoodTruckList from "./FoodTruckList";

function FavoritesList() {
    const { user } = useContext( AuthContext );
    console.log( `favorite Button ${ user?.uid }` );
    const { favorites, addFavorite, removeFavorite } = useContext( FavoriteContext );

    return (
        <>
            <FoodTruckList
        </>

            );
};