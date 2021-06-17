import "./FoodTruckList.css";

import { Button, Modal } from "react-bootstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import FoodTruckCard from "./FoodTruckCard";
import { Truck } from "../model/dbModel";
import { getFavorites } from "../service/WtfApiService";
import { getTruckData } from "../service/WtfApiService";

function FoodTruckList() {
  const history = useHistory();
  history.push( "/list" );

  const [ foodTrucks, setFoodTrucks ] = useState<Truck[]>( [] );
  const [ foodTrucksLoaded, setFoodTrucksLoaded ] = useState( false );
  const [ foodTruck, setFoodTruck ] = useState<Truck | null>( null );
  // thinking we just use setFoodTrucks to put either favs or list trucks in
  // const [favoriteTrucks, setFavoriteTrucks] = useState<Truck[]>([]);

  useEffect( () => {
    //TODO: ternary for which route user comes from?
    loadTrucks();
    // else
    // loadFavorites();
  }, [] );

  function loadTrucks() {
    getTruckData().then( ( trucksFromApi ) => {
      setFoodTrucks( trucksFromApi );
      setFoodTrucksLoaded( true );
    } );
  }

  // function loadFavorites() {
  //   getFavorites().then((trucksFromFavorites) => {
  //     //TODO: get type of trucksFromFavs to match trucksFromApi
  //     // probably have to change the model
  //     // trucksFromFav should be type Truck[]
  //     setFoodTrucks(trucksFromFavorites);
  //     setFoodTrucksLoaded(true);
  //   })
  // }

  function timeSinceLastPhoto( truck: Truck ) {
    const truckTimestamp: any = truck.lastLocation.timestamp;
    const currentTimestamp = Math.round( new Date().getTime() / 1000 );
    let timeDiffSeconds = currentTimestamp - truckTimestamp;
    let hours = ( timeDiffSeconds / 60 ) / 60;
    return Math.round( hours );
  }

  const openModal = ( truck: Truck ): void => setFoodTruck( truck );

  const closeModal = () => setFoodTruck( null );

  return (
    <div className="FoodTruckList">
      <header>
        <h1>Food Trucks</h1>
      </header>
      <Link to="/">
        <button id="mapViewTop">Map View</button>
      </Link>
      { !foodTrucksLoaded ? (
        <p id="loading">Loading...</p>
      ) : foodTrucks.length === 0 ? (
        <p>No Food Trucks available.</p>
      ) : (
        <div className="listDiv">
          { foodTrucks.sort( ( a, b ) => ( a.lastLocation.timestamp < b.lastLocation.timestamp ) ? 1 : -1 ).map( ( truckInList ) => (
            <div key={ truckInList._id } className="truck">
              <p id="name">{ truckInList.name }</p> {/* NOT WORKING */ }
              <p id="igHandle">{ `@${ truckInList.instagramHandle }` }</p>
              <p id="timestamp">{ `${ timeSinceLastPhoto( truckInList ) } hours ago` }</p>
              <button onClick={ () => openModal( truckInList ) }>
                More Details
              </button>
            </div>
          ) ) }
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
      <Link to="/">
        <button id="mapViewBottom">Back</button>
      </Link>
    </div>
  );
}

export default FoodTruckList;
