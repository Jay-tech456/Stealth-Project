import React from 'react';
import '../styles/card.css';
import { useLocation, useNavigate } from 'react-router-dom';
import tick from '../artifacts/tick.png';

function Card({ id, name, description, rating, numOfReviews, image, hour, locs, contact}) {
    const location = useLocation();
    const navigate = useNavigate();

    const storeInfo = [ 'Delivery', 'Indoor Dinings', 'Appointments', 'Walk In']
    const handleClick   = () =>{
        navigate('/resprofile', {
            state: {
              id,
              name,
              description,
              rating,
              numOfReviews,
              image,
              hour,
              locs,
              contact
            },
          });
    }
    if (location.pathname === '/restaurants' || location.pathname === '/resprofile'){ 
        return (
            <div className='bigCard'>
                <div style={{ backgroundImage: `url(${image})` }} className='card-left'>
                </div>
                <div className='card-right'>
                    <h3>{name}</h3>
                    <p>{description}</p>
                    <div className='storeInfo'>
                        {
                            storeInfo.map((item, index) => (
                                <div key={index}>
                                    <img src={tick} alt= 'tick' width={20} height={20}/>
                                    <p>{item}</p>
                                </div>
                            ))
                        }
                    </div>
                    {location.pathname === '/restaurants' && <button onClick={handleClick}> Get my food</button>}
                    {location.pathname === '/resprofile' && 
                        <div id = 'resprofile-info'>
                            <div id = 'child1'>
                                <p>Opening Hours</p>
                                {
                                    hour.map((hour, index) => (
                                        <div style={{width: '100%'}}> 
                                            <p style={{width: '150px'}}> {hour.date} </p>
                                            <p> {hour.hour} </p>
                                        </div>
                                    ))
                                }
                            </div>
                            <br/>
                            <div id = 'child2'>
                                <p>Location: {locs}</p>
                            </div>
                            <div id = 'child3'>
                                <p>Contact: {contact}</p>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
    else{
        return (
            <div className='card'>
            <div style={{ backgroundImage: `url(${image})` }} className='cardImage'> 
                <p>{rating}</p>
            </div>
            <div style={{paddingBottom: '5px'}}>
                <p>{name}</p>
                <p>{description}</p>
                <button onClick={handleClick} style={{borderStyle: 'none', borderRadius: '5px', backgroundColor: 'lightgrey', color: '#8B4513', fontWeight: 'bold'}}>Get my food</button>
            </div>
            </div>
        );
    }}

export default Card;
