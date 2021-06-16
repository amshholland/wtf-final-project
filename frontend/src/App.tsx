import { BrowserRouter, Route, Router, Switch } from 'react-router-dom';
import './App.css';
import FoodTruckCard from './components/FoodTruckCard';
import FoodTruckList from './components/FoodTruckList';
import MapComponent from './components/MapComponent';

function App() {
  return ( 
  
    <div className="App">
     <BrowserRouter>
        <Switch>
          <Route path="/map">
            <MapComponent />
          </Route>
          <Route path="/list">
            <FoodTruckList />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
