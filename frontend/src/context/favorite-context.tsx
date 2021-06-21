import { Favorite, User } from '../model/dbFavModel';
import { ReactNode, createContext, useContext, useState } from 'react';
import { getUserFavorites, postFavorite } from '../service/WtfApiService';

import { AuthContext } from './auth-context';

interface FavoriteContextValue {
    favorites: Favorite[];
    addFavorite: ( favorite: Favorite ) => void;
    removeFavorite: ( id: string ) => void;
}

const defaultValue: FavoriteContextValue = {
    favorites: [],
    addFavorite: () => { },
    removeFavorite: () => { }
};

export const FavoriteContext = createContext( defaultValue );

export function FavoriteContextProvider( { children }: { children: ReactNode; } ) {
    const { user } = useContext( AuthContext );

    const [ favorites, setFavorites ] = useState<Favorite[]>( [] );
    let userId: string | undefined = user?.uid;

    // Add if statement to determine if user logged in

    function addFavorite( favorite: Favorite ): void {
        setFavorites( prev => [ ...prev, favorite ] );
        postFavorite( favorite );
    }

    function removeFavorite( truckId: string ): void {

    }

    return (
        <FavoriteContext.Provider value={ { favorites, addFavorite, removeFavorite } }>
            { children }
        </FavoriteContext.Provider>
    );
}