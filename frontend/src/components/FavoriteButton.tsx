import { AuthContext } from "../context/auth-context";
import { FavoriteContext } from "../context/favorite-context";
import { useContext } from "react";

interface Props {
    truckId: number;
    closeModal: () => void;
}

export function FavoriteButton( { truckId}: Props ) {
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
        console.log( `handleRemoveFavorite: ${ truckId }` );
        if ( user?.uid && truckId ) {
            // commented out for CI/CD - does 'for of' already declare fav for us?
            // const fav = {
            //     truckId: truckId!
            // };
            for ( let fav of favorites ) {
                console.log( fav );
                if ( truckId === fav.truckId ) {
                    console.log( true );
                    removeFavorite( fav._id! );
                }
            }
        }
    }



    return (
        <div className="FavoriteButton">
            <button className="add" onClick={ () => handleAddFavorite() } >
                Add to F'ing Favs!
            </button>

            <button className="delete" onClick={ () => handleRemoveFavorite() }>
                F'ing Remove it!
            </button>
        </div>
    );
}