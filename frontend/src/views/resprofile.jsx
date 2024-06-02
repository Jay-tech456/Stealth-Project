import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Card from "../components/card";
import "../styles/resprofile.css";
import userIcon from "../artifacts/usericon.png";
function ResProfile() {
  const location = useLocation();
  const { id, name, description, rating, numOfReviews, image, hour, locs, contact } = location.state || {};
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const handleRating = (index) => {
    setUserRating(index);
    // post rating back to mongodb and then fetch all the information back and update the data in real time
  };
  const handleTextChange = (event) => {
    setReviewText(event.target.value);
    // post review back to mongodb and then fetch all the information back and update the data in real time
  };
  const handleSummitedReview = (event) => {
    // post review back to mongodb and then fetch all the information back and update the data in real time
    alert("Review submitted!");
  }
  

  return (
    <div className="resprofile">
      <Card name={name} description={description} rating={rating} image={image} hour={hour} locs={locs} contact={contact} />
      <section className="reviews">
        <h4>Add your reviews</h4>
        <div className="reviewStat">

          <div>
            <p>Reviews:</p>
            <p>{rating} / {numOfReviews}</p>
          </div>

          <div>
            <p>Rate me:</p>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star, index) => (
                <span
                  key={index}
                  className={`fa fa-star ${userRating >= star ? "checked" : ""}`}
                  onClick={() => handleRating(star)}
                ></span>
              ))}
            </div>
          </div>
        </div>

        <div className='writeReivews'>
            <textarea
            value={reviewText}
            onChange={handleTextChange}
            placeholder="Write your review here..."
            ></textarea>
             <button onClick={handleSummitedReview}> submit </button>

        </div>
      </section>

      <section className='reviewHistory'>
              <h1> Reviews </h1>
              <div>
                {
                    reviewData.map((data, index)=>(
                        <div key={index} style={{marginBottom: '30px'}} > 
                            <div className='profileInfo'>
                                <img src={userIcon} width={70} height={70} alt='user profile icon'/>
                                <div> 
                                    <p> {data.username}</p>
                                    <p> Rated: {data.rating}</p>
                                    <p> Date: {data.date}</p>
                                </div>
                            </div>
                            <div>
                                <p style={{fontSize: 'small'}}>{data.reviews}</p>
                            </div>
                        </div>
                    ))
                }
              </div>
      </section>
    </div>
  );
}

export default ResProfile;


const reviewData = [
    {
        username: 'John Doe',
        rating: 5,
        date: '05/20/2004',
        reviews: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur'
    },
    {
        username: 'Caleb quis',
        rating: 5,
        date: '05/20/2004',
        reviews: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur'
    }
]