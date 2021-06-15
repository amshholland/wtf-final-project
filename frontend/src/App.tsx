import './App.css';
import FoodTruckCard from './components/FoodTruckCard';
import FoodTruckList from './components/FoodTruckList';
import WrappedMap from './components/MapComponent';

function App() {
  return (
    <div className="App" style={{ width: "100vw", height: "100vh" }}>
      <FoodTruckList />
      <WrappedMap />
    </div>
  );
}

export default App;
