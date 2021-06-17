import { ReactNode, createContext, useState } from 'react';

import { Favorite } from '../model/dbFavModel';

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
    const [ favorites, setFavorites ] = useState<Favorite[]>( [] );

    function addFavorite( favorite: Favorite ): void {
        setFavorites( prev => [ ...prev, favorite ] );
    }

    function removeFavorite( id: string ): void {

    }

    return (
        <FavoriteContext.Provider value={ { favorites, addFavorite, removeFavorite } }>
            { children }
        </FavoriteContext.Provider>
    );
}