import React from 'react';
import Card from "./card";
import img1 from "../artifacts/img1.jpg";
import img2 from "../artifacts/img2.jpg";
import img3 from "../artifacts/img3.jpg";
import '../styles/card.css';
import { useLocation } from 'react-router-dom';

function Cards() {
    const path = useLocation();
    const data = [
        {
          id: 1,
          name: 'Gourmet Haven',
          description: 'A fine dining experience with exquisite dishes crafted by top chefs.',
          rating: 4.8,
          numOfReviews: 120,
          image: img1,
          hour: [ {date: 'Monday - Friday', hour: '9:00am - 9pm'}, {date: 'Weekends', hour: '9:00am - 9pm'}],
          location: '123 San Jose, CA',
          contact: '123-456-7891'
        },
        {
          id: 2,
          name: 'Sushi World',
          description: 'Authentic Japanese sushi made with fresh ingredients and a modern twist.',
          rating: 4.9,
          numOfReviews: 200,
          image: img2,
          hour: [ {date: 'Monday - Friday', hour: '9:00am - 9pm'}, {date: 'Weekends', hour: '9:00am - 9pm'}],
          location: '123 San Jose, CA',
          contact: '123-456-7891'
        },
        {
          id:3,
          name: 'Seafood Paradise',
          description: 'Delicious Italian seafood dishes served in a cozy, family-friendly atmosphere.',
          rating: 4.8,
          numOfReviews: 95,
          image: img3,
          hour: [ {date: 'Monday - Friday', hour: '9:00am - 9pm'}, {date: 'Weekends', hour: '9:00am - 9pm'}],
          location: '123 San Jose, CA',
          contact: '123-456-7891'
        },
        {
          id: 4,
          name: 'Big Bistro',
          description: 'Gourmet burgers made with premium ingredients, served in a chic setting.',
          rating: 4.9,
          numOfReviews: 150,
          image: img2,
          hour: [ {date: 'Monday - Friday', hour: '9:00am - 9pm'}, {date: 'Weekends', hour: '9:00am - 9pm'}],
          location: '123 San Jose, CA',
          contact: '123-456-7891'
        }
      ];

  return (
    <div className="cards">
      <div style= { path.pathname === '/restaurants' ? { display: 'block'}: {}}>
        {data.map((item, index) => (
          <Card
            key={index}
            name={item.name}
            description={item.description}
            rating={item.rating}
            numOfReviews={item.numOfReviews}
            image={item.image}
            hour = {item.hour}
            locs = {item.location}
            contact = {item.contact}
          />
        ))}
      </div>
    </div>
  );
}

export default Cards;
