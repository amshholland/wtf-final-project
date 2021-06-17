import './FoodTruckCard.css';

import { Button, Modal } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';

import { Truck } from '../model/dbModel';

interface Props {
    truck: Truck;
    handleClose: () => void;
}

function FoodTruckCard( { truck, handleClose }: Props ) {

    function timeSinceLastPhoto( timestamp: number ) {
        const currentTimestamp = Math.round( new Date().getTime() / 1000 );
        let timeDiffSeconds = currentTimestamp - timestamp;
        let hours = ( timeDiffSeconds / 60 ) / 60;
        return Math.round( hours );
    }

    return (
        <Modal.Dialog className="FoodTruckCard">

            <Modal.Header>
                <Modal.Title><img className="profilePic" src={ truck.profilePhoto } alt={ truck.profileDescription } /></Modal.Title>
                <Button type="button" className="close" data-dismiss="modal" onClick={ handleClose }> X </Button>
            </Modal.Header>

            <Modal.Body>
                <h2>{ truck.name }</h2>
                <p>@{ truck.instagramHandle }</p>

                <section>
                    { truck.profileDescription }
                </section>

                {/* Display last 3 posts */ }
                <div className="iGPosts">
                    <h3>Last Seen:</h3>
                    { truck.locationHistory.slice( 0, 3 ).map( ( post ) => (
                        <div className="post">
                            <p id="timestamp">{ `${ timeSinceLastPhoto( post.timestamp ) } hours ago` }</p>
                            <p>{ post.locationName }</p>
                            <p>{ post.address }</p>
                            <p>{ post.city }</p>
                            <img src={ post.photo } alt='TODO' />
                            <p>{ post.caption }</p>
                        </div>
                    ) ) }
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

export default FoodTruckCard;;;