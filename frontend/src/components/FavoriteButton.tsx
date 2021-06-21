import { ChangeEvent, FormEvent, useContext, useState } from "react";

import { AuthContext } from "../context/auth-context";
import { Button } from 'react-bootstrap';
import { Favorite } from "../model/dbFavModel";
import { Truck } from "../model/dbModel";

// import { FavoriteContext } from "../context/favorite-context.txt";


interface Props {
    truck: Truck;
}

export function FavoriteButton( { truck }: Props ) {
    // const { addFavorite } = useContext( FavoriteContext );

    function handleButtonClick(): void {
        let favorite = {
            truckId: truck._id!
        };

        // addFavorite( favorite );
    }


    return (
        <button className="Favorite" onClick={ () => handleButtonClick() }>
            Add to Favorites
        </button>
    );
}