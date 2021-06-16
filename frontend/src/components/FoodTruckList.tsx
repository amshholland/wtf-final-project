import "./FoodTruckList.css";

import { Button, Modal } from 'react-bootstrap';
import { Link, useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import FoodTruckCard from "./FoodTruckCard";
import { Truck } from "../model/dbModel";
import { getTruckData } from "../service/WtfApiService";

function FoodTruckList() {
  const history = useHistory();
  history.push( "/list" );

  const [ foodTrucks, setFoodTrucks ] = useState<Truck[]>( [] );
  const [ foodTrucksLoaded, setFoodTrucksLoaded ] = useState( false );
  const [ foodTruck, setFoodTruck ] = useState<Truck | null>( null );

  let unix_timestamp = 1549312452;
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  let date = new Date( unix_timestamp * 1000 );
  // Hours part from the timestamp
  let hours = date.getHours();
  // Minutes part from the timestamp
  let minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  let seconds = "0" + date.getSeconds();

  // Will display time in 10:30:23 format
  let formattedTime =
    hours + ":" + minutes.substr( -2 ) + ":" + seconds.substr( -2 );

  useEffect( () => {
    loadTrucks();
  }, [] );

  function loadTrucks() {
    getTruckData().then( ( trucksFromApi ) => {
      setFoodTrucks( trucksFromApi );
      setFoodTrucksLoaded( true );
    } );
  }

  const openModal = ( truck: Truck ): void => setFoodTruck( truck );

  const closeModal = () => setFoodTruck( null );


  return (
    <div className="FoodTruckList">
      <header>
        <h1>Food Trucks</h1>
      </header>
      { !foodTrucksLoaded ? (
        <p id="loading">Loading...</p>
      ) : foodTrucks.length === 0 ? (
        <p>No Food Trucks available.</p>
      ) : (
        <div className="listDiv">
          { foodTrucks.map( ( truck ) => (
            <div key={ truck._id } className="truck">
              <p id="name">{ truck.name }</p>
              <p id="igHandle">{ `@${ truck.instagramHandle }` }</p>
              <button onClick={ () => openModal( truck ) } >More Details</button>
            </div>
          ) ) }
        </div>


      ) }
      <Modal show={ foodTruck !== null } className="mymodal" overlayClassName="myoverlay" centered>
        { foodTruck !== null &&
          <FoodTruckCard truck={ foodTruck } handleClose={ closeModal } />
        }
      </Modal>
      <Link to="/"><button>Map View</button></Link>
    </div>
  );
}

export default FoodTruckList;
