import './FoodTruckCard.css';

import { Button, Modal } from 'react-bootstrap';

import { Favorite } from '../model/dbFavModel';
import { FavoriteButton } from './FavoriteButton';
import { FavoriteContext } from "../context/favorite-context";
import { Truck } from '../model/dbModel';
import { useContext } from 'react';
import getTimeDiff from '../utils/getTimeDiff';

interface Props {
    truck: Truck;
    handleClose: () => void;
}

function FoodTruckCard( { truck, handleClose }: Props ) {

    // const { favorites } = useContext( FavoriteContext );
    // For each truck, search through favorite array to find same id
    // array.some -- looks for certain callback 

    function timeSinceLastPhoto( timestamp: number ) {
        const currentTimestamp = Math.round( new Date().getTime() / 1000 );
        return getTimeDiff(timestamp, currentTimestamp);
    }
    // Filter our results first to omit posts with no location
    // const favorited = favorites.filter( function ( fav ) {
    //     if ( fav.truckId === truck._id ) {
    //         return true;
    //     }
    //     return false;
    // } );

    return (
        <Modal.Dialog className="FoodTruckCard">

            <Modal.Header>
                {/* { favorited && <img className="star" src={ process.env.PUBLIC_URL + '/favorited.png' } /> } */ }
                <Modal.Title><img className="profilePic" src={ truck.profilePhoto } alt={ truck.profileDescription } /></Modal.Title>
                <Button type="button" className="close" data-dismiss="modal" onClick={ handleClose }> X </Button>
            </Modal.Header>

            <Modal.Body>
                <h2>{ truck.name }</h2>
                <p>@{ truck.instagramHandle }</p>

                <section>
                    { truck.profileDescription }
                </section>

                <h3>Last Seen:</h3>
                {/* Display last 3 posts */ }
                <div className="iGPosts">

                    { truck.locationHistory.slice( 0, 3 ).map( ( post ) => (
                        <div key={ post.timestamp } className="post">
                            <p id="timestamp">{ timeSinceLastPhoto( post.timestamp ) }</p>
                            <p>{ post.locationName }</p>
                            <p>{ post.address }</p>
                            <p>{ post.city }</p>
                            <div className="cardImg">
                                <img className="postImg" src={ post.photo } alt='' />
                            </div>
                            <p>{ post.caption.text }</p>
                        </div>
                    ) ) }
                </div>

            </Modal.Body>
            <Modal.Footer>
                <a href="https://wtf-truck.web.app/">View on map</a>
                <FavoriteButton truckId={ truck.iGId } />
                <Button onClick={ handleClose }>Close</Button>
            </Modal.Footer>
        </Modal.Dialog >
    );
}

export default FoodTruckCard;;