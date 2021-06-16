import './FoodTruckCard.css';

import { Button, Modal } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';

import { Truck } from '../model/dbModel';

interface Props {
    truck: Truck;
    handleClose: () => void;
}

function FoodTruckCard( { truck, handleClose }: Props ) {



    return (
        <Modal.Dialog className="FoodTruckCard">

            <Modal.Header>
                <Modal.Title>{ truck.name }</Modal.Title>
                <Button type="button" className="close" data-dismiss="modal" onClick={ handleClose }> X </Button>
            </Modal.Header>

            <Modal.Body>
                <div className="cardImgDiv">
                    <img className="cardImg" src='#' />
                </div>
                <p>@{ truck.instagramHandle }</p>

                <section>
                    { truck.profileDescription }
                </section>

                <div className="iGPosts">
                    POST DETAILS
                </div>
            </Modal.Body>
            <Modal.Footer>
                <a href="#">View on map</a>
                <a href="#">Add to favorites</a>
                <Button onClick={ handleClose }>Close</Button>
            </Modal.Footer>
        </Modal.Dialog >
    );
}

export default FoodTruckCard;;