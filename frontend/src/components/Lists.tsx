import "./Lists.css";

import { Button, Modal } from "react-bootstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../context/auth-context";
import { FavoriteButton } from "./FavoriteButton";
import FoodTruckCard from "./FoodTruckCard";
import { Truck } from "../model/dbModel";
import { getTruckData } from "../service/WtfApiService";

interface Props {
    foodTrucks: Truck[];
}

export function Lists( { foodTrucks }: Props ) {
    console.log( `line18: ${ foodTrucks }` );

    const { user } = useContext( AuthContext );
    const [ foodTruck, setFoodTruck ] = useState<Truck | null>( null );
    const [ foodTrucksLoaded, setFoodTrucksLoaded ] = useState( false );
    // const [ foodTrucks, setFoodTrucks ] = useState<Truck[]>( [] );
    function timeSinceLastPhoto( truck: Truck ) {
        const truckTimestamp: any = truck.lastLocation.timestamp;
        const currentTimestamp = Math.round( new Date().getTime() / 1000 );
        let timeDiffSeconds = currentTimestamp - truckTimestamp;
        let hours = ( timeDiffSeconds / 60 ) / 60;
        let days = Math.round( hours / 24 );
        if ( hours > 24 ) {
            return `${ days } days ago`;
        }
        return `${ hours } hours ago`;
    }

    const openModal = ( truck: Truck ): void => setFoodTruck( truck );
    const closeModal = () => setFoodTruck( null );

    return (
        <div className="container">
            <div className="FoodTruckList">
                { console.log( `line40: ${ foodTrucks }` ) }
                { !foodTrucksLoaded ? (
                    <p id="loading">Loading...</p>
                ) : foodTrucks.length === 0 ? (
                    <p>No Food Trucks available.</p>
                ) : (
                    <div className="listContainer">
                        <div className="listDiv">
                            { foodTrucks
                                .sort( ( a, b ) =>
                                    a.lastLocation.timestamp < b.lastLocation.timestamp ? 1 : -1
                                )
                                .map( ( truckInList ) => (
                                    <div key={ truckInList._id } className="truck">
                                        { console.log( `line54: ${ truckInList }` ) }
                                        < img
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
                {/* <Link to="/"> */ }
                <button id="mapViewBottom">Back</button>
                {/* </Link> */ }
            </div>
            <button id="scrollToTop">
                <Link to="map">
                    <i className="material-icons">arrow_upward</i>
                </Link>
            </button>
        </div >
    );
}