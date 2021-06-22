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

    console.log( favorites );
    useEffect( () => {
        console.log( 'got to fav context useEffect' );
        if ( userId ) {
            getFavoritesFromDb( userId ).then( favs => {
                setFavorites( favs );
                console.log();
            } );
        }
        else {
            console.log( 'logged out' );
            setFavorites( [] );
        }
    }, [ userId ] );

    function addFavorite( favorite: Favorite ): void {
        console.log( 'a' );
        if ( userId ) {
            console.log( 'b' );
            addFavoriteToDb( favorite ).then( fav => {
                if ( userId ) {
                    console.log( 'c' );

                    getFavoritesFromDb( userId ).then( favs => {
                        setFavorites( favs );
                    } );
                }
            } );
        }
    }

    function removeFavorite( _id: string ): void {
        if ( userId ) {
            console.log( 'remove' );
            removeFavoriteFromDb( _id ).then( fav => {
                if ( userId ) {
                    console.log( 'remove fav pt 2' );
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