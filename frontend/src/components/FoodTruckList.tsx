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

  useEffect( () => {
    loadTrucks();
  }, [] );

  function loadTrucks() {
    getTruckData().then( ( trucksFromApi ) => {
      setFoodTrucks( trucksFromApi );
      setFoodTrucksLoaded( true );
      console.log( getTruckData() );
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
