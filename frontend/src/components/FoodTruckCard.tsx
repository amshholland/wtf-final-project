import { Truck } from '../model/dbModel';
import './FoodTruckCard.css';

interface Props {
        truck: Truck;
    }

function FoodTruckCard({truck}: Props) {
    

    return (
        <div className="FoodTruckCard">
            <h1>{truck.name}</h1>
            <h3>{truck.instagramHandle}</h3>
            <div className="img">
                most recent instagram photo here.
            </div>
            <section>
                description here
            </section>
            <a href="#">View on map</a>
            <a href="#">Add to favorites</a>
        </div>
    )
}

export default FoodTruckCard;