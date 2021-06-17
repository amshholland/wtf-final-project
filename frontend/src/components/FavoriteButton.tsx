import { ChangeEvent, FormEvent, useState } from "react";

import { Button } from 'react-bootstrap';
import { Favorite } from "../model/dbFavModel";
import { Truck } from "../model/dbModel";
import { postFavorite } from '../service/WtfApiService';

interface Props {
    truck: Truck;
    handleClose: () => void;
}

export function FavoriteButton( { truck, handleClose }: Props ) {
    const [ favorites, setFavorites ] = useState<Favorite[]>();

    const [ foodTruck, setFoodTruck ] = useState<Truck | null>( null );
    const [ removeTruck, favoritedTruck ] = useState<Truck | null>( null );

    const addFavorite = ( foodTruck ) => {
        postFavorite();
    };

    function handleButtonClick( e: ChangeEvent ): void {
        setFoodTruck( e.target.value );
        addFavorite( foodTruck );
    }

    return (
        <form>
            <button className="Favorite" onClick={ handleButtonClick } onChange={ handleButtonClick } >
                Add to Favorites
            </button>
        </form>
    );
}