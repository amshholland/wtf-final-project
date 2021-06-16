import { useHistory, useParams } from 'react-router-dom';
import { Truck } from '../model/dbModel';
import './FoodTruckCard.css';

interface Props {
        truck: Truck;
    }

    interface RouteParams {
        id: string;
      }
      
      const {id} = useParams<RouteParams>();

function FoodTruckCard({truck}: Props) {
    const history = useHistory();
    history.push("/card");
    

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