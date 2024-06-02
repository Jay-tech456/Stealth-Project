import React from 'react';
import Navigation from '../navigation/navigation';
import Cards from '../components/cards';
import '../styles/home.css';

function Home() {
  return (
    <div className='home'>
      <div className='home-background'>
        <div className='background-shade'>
          <input type='search' placeholder='Find your favorite food . . .' />
        </div>
      </div>
      <div className='home-content'>
        <h1>Welcome to Foodie</h1>
        <p>Discover the best food in your city</p>
      </div>
      <Cards />
    </div>
  );
}

export default Home;



