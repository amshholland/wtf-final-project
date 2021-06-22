import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { addFavoriteToDb, getFavoritesFromDb, removeFavoriteFromDb } from '../service/WtfApiService';

import { AuthContext } from './auth-context';
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
    const { user } = useContext( AuthContext );
    console.log( user );
    const [ favorites, setFavorites ] = useState<Favorite[]>( [] );
    let userId: string | undefined = user?.uid;

    useEffect( () => {
        console.log( 'got to useEffect' );
        if ( userId ) {
            console.log( 'logged in' );
            getFavoritesFromDb( userId ).then( favs => {
                setFavorites( favs );
            } );
        }
        else {
            console.log( 'logged out' );
            setFavorites( [] );
        }
    }, [ userId ] );

    function addFavorite( favorite: Favorite ): void {
        if ( userId ) {
            addFavoriteToDb( favorite ).then( fav => {
                if ( userId ) {
                    getFavoritesFromDb( userId ).then( favs => {
                        setFavorites( favs );
                    } );
                }
            } );
        }
    }

    function removeFavorite( _id: string ): void {
        if ( userId ) {
            removeFavoriteFromDb( _id ).then( fav => {
                if ( userId ) {
                    getFavoritesFromDb( userId ).then( favs => {
                        setFavorites( favs );
                    } );
                }
            } );
        }
    }

    return (
        <FavoriteContext.Provider value={ { favorites, addFavorite, removeFavorite } }>
            { children }
        </FavoriteContext.Provider>
    );
}