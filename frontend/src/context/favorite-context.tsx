import { ReactNode, createContext, useContext, useState } from 'react';
import { addFavorite, getUserFavorites } from '../service/WtfApiService';

import { AuthContext } from './auth-context';
import { Favorite } from '../model/dbFavModel';

interface FavoriteContextValue {
    favorite: Favorite[];
    addFavorite: ( favorite: Favorite ) => void;
    removeFavorite: ( id: string ) => void;
}

const defaultValue: FavoriteContextValue = {
    favorite: [],
    addFavorite: () => { },
    removeFavorite: () => { }
};

export const FavoriteContext = createContext( defaultValue );

export function FavoriteContextProvider( { children }: { children: ReactNode; } ) {
    const { user } = useContext( AuthContext );

    const [ favorite, setFavorite ] = useState<Favorite[]>( [] );
    let userId: string | undefined = user?.uid;

    return (
        <FavoriteContext.Provider value={ { favorite, addFavorite, removeFavorite } }>
            { children }
        </FavoriteContext.Provider>
    );
}