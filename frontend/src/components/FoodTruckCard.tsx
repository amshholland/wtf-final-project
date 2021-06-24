import './FoodTruckCard.css';

import { Button, Modal } from 'react-bootstrap';

import { FavoriteButton } from './FavoriteButton';
import { FavoriteContext } from "../context/favorite-context";
import { Truck } from '../model/dbModel';
import getTimeDiff from '../utils/getTimeDiff';
import { useContext } from 'react';

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
        return getTimeDiff( timestamp, currentTimestamp );
    }
    // Filter our results first to omit posts with no location

    // } );

    return (
        <div className="FoodTruckCard">
            <div className="modalTitle">
                {/* { favorited && <img className="star" src={ process.env.PUBLIC_URL + '/favorited.png' } /> } */ }
                <div className="profilePicDiv">
                    <img className="profilePic" src={ truck.profilePhoto } alt={ truck.profileDescription } />
                </div>
                <Button type="button" className="close" data-dismiss="modal" onClick={ handleClose }> X </Button>
            </div>
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
                        <div className="location">
                            <div className="locIcon">
                                <img className="locationIcon" src={ process.env.PUBLIC_URL + '/Location_Icon.png' } alt="Location Icon" />
                            </div>
                            <div className="locationDetails">
                                <p id="name">{ post.locationName }</p>
                                <p id="address">{ post.address }</p>
                                <p id="city">{ post.city }</p>
                            </div>
                        </div>
                        <div className="cardImg">
                            <img className="postImg" src={ post.photo } alt='' />
                        </div>
                        { post.caption.text &&
                            <p id="caption">{ post.caption.text }</p> }
                    </div>
                ) ) }
            </div>
            <Modal.Footer>
                <FavoriteButton truckId={ truck.iGId } />
            </Modal.Footer>
        </div >
    );
}

export default FoodTruckCard;