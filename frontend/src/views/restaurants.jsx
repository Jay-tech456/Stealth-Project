import '../styles/restaurants.css';
import Cards from '../components/cards';
function Restaurants() {
    return ( 
    <div className="restaurants">
        <div>
            <h3> Food Near Me</h3>
            <input type="search" placeholder="Find your favorite food . . ." />
            <Cards/>
        </div>
    </div> );
}

export default Restaurants;