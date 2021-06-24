import "./FoodTruckList.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth-context";
import { FavoriteContext } from "../context/favorite-context";
import FoodTruckCard from "./FoodTruckCard";
import { Modal } from "react-bootstrap";
import { Truck } from "../model/dbModel";
import { getTruckData } from "../service/WtfApiService";
import { animateScroll as scroll } from "react-scroll";

export function FavoritesList() {

    const [ foodTrucks, setFoodTrucks ] = useState<Truck[]>( [] );
    const [ foodTrucksLoaded, setFoodTrucksLoaded ] = useState( false );
    const [ foodTruck, setFoodTruck ] = useState<Truck | null>( null );

    const { user } = useContext( AuthContext );
    console.log( `favorite Button ${ user?.uid }` );
    const { favorites } = useContext( FavoriteContext );

    useEffect( () => {
        loadTrucks();
    }, [] );

    function loadTrucks() {
        getTruckData().then( ( trucksFromApi ) => {
            setFoodTrucks( trucksFromApi );
            setFoodTrucksLoaded( true );
        } );
    }

    let favs: Truck[] = [];

    favorites.forEach( fav => favs = foodTrucks.filter( truckId => truckId.iGId === fav.truckId ) );

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

    const openModal = ( truck: Truck ): void => setFoodTruck( truck );
    const closeModal = () => setFoodTruck( null );

    return (
        <div className="container">
            <div className="FoodTruckList" id="list">
                {/* <Link to="/"> */ }
                {/* <button id="mapViewTop">Map View</button> */ }
                {/* </Link> */ }
                { !foodTrucksLoaded ? (
                    <p id="loading">Loading...</p>
                ) : foodTrucks.length === 0 ? (
                    <p>No Food Trucks available.</p>
                ) : (
                    <div className="listContainer">
                        <div className="listDiv">
                            <header>
                                <h1>Favorite Trucks</h1>
                            </header>
                            { favs
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
                    show={ foodTruck !== null }
                    className="mymodal"
                    overlayClassName="myoverlay"
                    centered
                >
                    { foodTruck !== null && (
                        <FoodTruckCard truck={ foodTruck } handleClose={ closeModal } />
                    ) }
                </Modal>
            </div>
           
        </div>
    );
}
