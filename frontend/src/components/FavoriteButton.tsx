import { ChangeEvent, FormEvent, useContext, useState } from "react";

import { AuthContext } from "../context/auth-context";
import { Button } from 'react-bootstrap';
import { Favorite } from "../model/dbFavModel";
import { FavoriteContext } from "../context/favorite-context";
import { Truck } from "../model/dbModel";

interface Props {
    truckId: number;
}

export function FavoriteButton( { truckId }: Props ) {
    const { user } = useContext( AuthContext );
    console.log( `favorite Button ${ user?.uid }` );
    const { favorites, addFavorite, removeFavorite } = useContext( FavoriteContext );

    function handleAddFavorite(): void {
        if ( user?.uid && truckId ) {
            const fav = {
                userId: user.uid,
                truckId: truckId!
            };
            addFavorite( fav );
        }
    };

    function handleRemoveFavorite(): void {
        console.log( `handleremovefav: ${ truckId } ` );
        for ( let fav of favorites ) {
            console.log( fav.truckId );
            if ( truckId === fav.truckId ) {
                console.log( true );
                removeFavorite( fav._id! );
            }
        }
    }


    return (
        <div className="Favorite">
            <button className="add" onClick={ () => handleAddFavorite() } >
                Add to Favorites
            </button>

            <button className="delete" onClick={ () => handleRemoveFavorite() }>
                Remove from Favorite
            </button>
        </div>
    );
}