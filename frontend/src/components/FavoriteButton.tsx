import { ChangeEvent, FormEvent, useContext, useState } from "react";

import { AuthContext } from "../context/auth-context";
import { Button } from 'react-bootstrap';
import { FavoriteContext } from "../context/favorite-context";
import { Favorites } from "../model/dbFavModel";
import { Truck } from "../model/dbModel";
import userEvent from "@testing-library/user-event";

interface Props {
    truck: Truck;
}

export function FavoriteButton( { truck }: Props ) {
    const { addFavorite } = useContext( FavoriteContext );
    const { user } = useContext( AuthContext );

    function handleButtonClick(): void {
        let favorite = {
            userId: user?.uid || undefined,
            truckId: truck._id!
        };
        addFavorite( favorite );
    }


    return (
        <button className="Favorite" onClick={ () => handleButtonClick() }>
            Add to Favorites
        </button>
    );
}