import { useEffect, useState } from "react";

import { Favorite } from "../model/dbFavModel";
import { useParams } from "react-router-dom";

interface User {
    _id: string;
}

function FavoritesList() {
    const _id: string = useParams<User>()._id;

    const [ userFavorites, setUserFavorites ] = useState<Favorite[]>( [] );
    const [ userFavoritesLoaded, setUserFavoritesLoaded ] = useState( false );

    useEffect( () => {
        // load our initial data here.
        // loadFavorites( _id );
    }, [ _id ] );

    // function loadFavorites( _id: string ) {
    //     if ( user.favorites ) {
    //         getUserFavorites( _id ).then( fav => {
    //             setUserFavorites( fav );
    //             setUserFavoritesLoaded( true );
    //         } );
    //     }
    // }
}