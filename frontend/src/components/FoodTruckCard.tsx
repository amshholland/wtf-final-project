import './FoodTruckCard.css';

import { Button, Modal } from 'react-bootstrap';

import { AuthContext } from '../context/auth-context';
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
    const { user } = useContext( AuthContext );
    const { favorites, addFavorite, removeFavorite } = useContext( FavoriteContext );

    function timeSinceLastPhoto( timestamp: number ) {
        const currentTimestamp = Math.round( new Date().getTime() / 1000 );
        let timeDiffSeconds = currentTimestamp - timestamp;
        let hours = timeDiffSeconds / 60 / 60;
        let days = Math.round( hours / 24 );
        if ( hours > 24 ) {
            return `${ Math.round( days ) } days ago`;
        }
        return `${ Math.round( hours ) } hours ago`;
    }

    function handleAddFavorite(): void {
        if ( user?.uid && truck.iGId ) {
            const fav = {
                userId: user.uid,
                truckId: truck.iGId!
            };
            addFavorite( fav );
        }
    };

    function handleRemoveFavorite(): void {
        if ( user?.uid && truck.iGId ) {

            for ( let fav of favorites ) {
                console.log( fav );
                if ( truck.iGId === fav.truckId ) {
                    console.log( true );
                    removeFavorite( fav._id! );
                }
            }
        }
    }

    return (
        <div className="FoodTruckCard">
            <div className="modalTitle">
                {/* { favorited && <img className="star" src={ process.env.PUBLIC_URL + '/favorited.png' } /> } */ }
                <div className="profilePicDiv">
                    <img className="profilePic" src={ truck.profilePhoto } alt={ truck.profileDescription } />
                </div>
            </div>
            <Button type="button" className="close" data-dismiss="modal" onClick={ handleClose }> X </Button>

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
                <div className="FavoriteButton">
                    <button className="add" onClick={ () => handleAddFavorite() } >
                        Add to F'ing Favs!
                    </button>

                    <button className="delete" onClick={ () => handleRemoveFavorite() }>
                        F'in remove it!
                    </button>
                </div>
            </Modal.Footer>
        </div >
    );
}

export default FoodTruckCard;