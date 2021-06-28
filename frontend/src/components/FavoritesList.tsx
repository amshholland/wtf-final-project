import "./FavoritesList.css";

import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../context/auth-context";
import { FavoriteContext } from "../context/favorite-context";
import FoodTruckCard from "./FoodTruckCard";
import { Modal } from "react-bootstrap";
import { Truck } from "../model/dbModel";
import { getTruckData } from "../service/WtfApiService";
import { animateScroll as scroll } from "react-scroll";

export function FavoritesList() {

    const [ favTrucks, setFavTrucks ] = useState<Truck[]>( [] );
    const [ favTrucksLoaded, setFavTrucksLoaded ] = useState( false );
    const [ favTruck, setFavTruck ] = useState<Truck | null>( null );
    const [ trucks, setTrucks ] = useState<Truck[]>( [] );

    const { user } = useContext( AuthContext );
    console.log( `favorite Button ${ user?.uid }` );
    const { favorites } = useContext( FavoriteContext );

    useEffect( () => {
        console.log( 'useeffect' );
        loadTrucks();
    }, [] );

    useEffect( () => {
        let favs: Truck[] = [];
        for ( let truck of trucks ) {
            for ( let fav of favorites ) {
                if ( truck.iGId === fav.truckId ) {
                    console.log( fav.userId, fav.truckId );
                    favs.push( truck );
                }
            }
        }
        console.log( favs );
        setFavTrucks( favs );
        setFavTrucksLoaded( true );
    }, [ favorites, trucks ] );

    function loadTrucks() {
        console.log( 'loadtrucks' );
        getTruckData().then( ( trucksFromApi ) => {
            setTrucks( trucksFromApi );
        } );
    }

    function timeSinceLastPhoto( truck: Truck ) {
        const truckTimestamp: any = truck.lastLocation.timestamp;
        const currentTimestamp = Math.round( new Date().getTime() / 1000 );
        let timeDiffSeconds = currentTimestamp - truckTimestamp;
        let hours = timeDiffSeconds / 60 / 60;
        let days = Math.round( hours / 24 );
        if ( hours > 24 ) {
            return `${ Math.round( days ) } days ago`;
        }
        return `${ Math.round( hours ) } hours ago`;
    }

    const openModal = ( truck: Truck ): void => setFavTruck( truck );
    const closeModal = () => setFavTruck( null );

    return (
        <div className="container">
            <div className="FavoritesList" id="list">
                { !favTrucksLoaded ? (
                    <p id="loading">Loading...</p>
                ) : favTrucks.length === 0 ? (
                    <p>No Food Trucks available.</p>
                ) : (
                    <div className="listContainer">
                        <div className="listDiv">
                            <header>
                                <h1>Favorite Trucks</h1>
                            </header>
                            { favTrucks
                                .sort( ( a, b ) =>
                                    a.lastLocation.timestamp < b.lastLocation.timestamp ? 1 : -1
                                )
                                .map( ( truckInList ) => (
                                    <div key={ truckInList._id } className="truck">
                                        <img
                                            src={ truckInList.profilePhoto }
                                            alt=""
                                            className="imgInList"
                                        />
                                        <p id="name">{ truckInList.name }</p>
                                        <p id="igHandle">{ `@${ truckInList.instagramHandle }` }</p>
                                        <p id="timestamp">{ `Last updated ${ timeSinceLastPhoto(
                                            truckInList
                                        ) }` }</p>
                                        <div className="buttons">
                                            <button
                                                className="details"
                                                onClick={ () => openModal( truckInList ) }
                                            >
                                                More Details
                                            </button>
                                            <div className="favbtn">
                                                {/* {user && <FavoriteButton truck={truckInList} />} */ }
                                            </div>
                                        </div>
                                    </div>
                                ) ) }
                        </div>
                    </div>
                ) }
                <Modal
                    show={ favTruck !== null }
                    className="mymodal"
                    overlayClassName="myoverlay"
                    centered
                >
                    { favTruck !== null && (
                        <FoodTruckCard truck={ favTruck } handleClose={ closeModal } />
                    ) }
                </Modal>
            </div>

        </div>
    );
}
