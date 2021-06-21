import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { Favorites } from "../model/dbFavModel";
import { getUserFavorites } from "../service/WtfApiService";

interface User {
    gId: string;
}

function FavoritesList() {
    const gId: string = useParams<User>().gId;

    const [ userFavorites, setUserFavorites ] = useState<Favorites[]>( [] );
    const [ userFavoritesLoaded, setUserFavoritesLoaded ] = useState( false );

    useEffect( () => {
        // load our initial data here.
        loadFavorites( gId );
    }, [ gId ] );

    function loadFavorites( gId: string ) {
        getUserFavorites( gId ).then( fav => {
            setUserFavorites( fav );
            setUserFavoritesLoaded( true );
        } );
    }