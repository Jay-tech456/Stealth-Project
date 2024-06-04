import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Card from "../components/card";
import "../styles/resprofile.css";
import userIcon from "../artifacts/usericon.png";
import getReviews from "../functions/getReviews";
import postReview from "../functions/postReviews";
import AuthContext from "../functions/hook";

function ResProfile() {
  const location = useLocation();
  const { id, name, description, rating, numOfReviews, image, hour, locs, contact } = location.state || {};
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewData, setReviewData] = useState([]);
  const [thisRating, setRating] = useState(rating); // Initialize with your initial rating
  const [thisNumOfReviews, setNumOfReviews] = useState(numOfReviews); // Initialize with your initial number of reviews

  const { user } = useContext(AuthContext);

  const handleRating = (index) => {
    setUserRating(index);
  };

  const handleTextChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleSummitedReview = async () => {
    if(user?.user){
        const review = {
          key: id,
          restaurant_name: name,
          description: reviewText,
          star: userRating,
          time_date: new Date(),
          first_name: user?.user["First Name"],
        };
  
        const result = await postReview(review);
        if (result.status === 'ok') {
          setReviewText('');
          setUserRating(0);
          setReviewData([...reviewData, review]); // Update the review data locally
  
          // Update rating and numOfReviews locally
          const newRating = ((rating * numOfReviews) + userRating) / (numOfReviews + 1);
          setRating(newRating.toFixed(2));
          setNumOfReviews(numOfReviews + 1);
        } else {
          alert("Failed to submit review");
        }
    }
    else{
        alert("Please login first");
    }
  };
  


  useEffect(() => {
    const fetchReviews = async () => {
      const restaurantName = name;
      const result = await getReviews(restaurantName);
      if (result.status === 'ok') {
        setReviewData(result.data);
      } else {
        console.log("Failed to fetch reviews");
      }
    };

    fetchReviews();
  }, [name]);

  return (
    <div className="resprofile">
      <Card name={name} description={description} rating={rating} image={image} hour={hour} locs={locs} contact={contact} />
      <section className="reviews">
        <h4>Add your reviews</h4>
        <div className="reviewStat">
          <div>
            <p>Reviews:</p>
            <p>{thisRating} / {thisNumOfReviews}</p>
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
          <button onClick={handleSummitedReview}>Submit</button>
        </div>
      </section>

      <section className='reviewHistory'>
        <h1> Reviews </h1>
        <div>
          {reviewData.slice().reverse().map((data, index) => (
            <div key={index} style={{ marginBottom: '30px' }}>
              <div className='profileInfo'>
                <img src={userIcon} width={70} height={70} alt='user profile icon'/>
                <div>
                  <p>{data.first_name}</p>
                  <p>Rated: {data.star}</p>
                  <p>Date: {new Date(data.time_date).toLocaleString()}</p>
                </div>
              </div>
              <div>
                <p style={{ fontSize: 'small' }}>{data.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default ResProfile;

// function ResProfile() {
//   const location = useLocation();
//   const { id, name, description, rating, numOfReviews, image, hour, locs, contact } = location.state || {};
//   const [userRating, setUserRating] = useState(0);
//   const [reviewText, setReviewText] = useState('');
//   const [reviewData, setReviewData] = useState([]);
//   const handleRating = (index) => {
//     setUserRating(index);
//     // post rating back to mongodb and then fetch all the information back and update the data in real time
//   };
//   const handleTextChange = (event) => {
//     setReviewText(event.target.value);
//     // post review back to mongodb and then fetch all the information back and update the data in real time
//   };
//   const handleSummitedReview = (event) => {
//     // post review back to mongodb and then fetch all the information back and update the data in real time
//     alert("Review submitted!");
//   }

//   useEffect(() => {
//     const fetchReviews = async () => {
//       const restaurantName = name;
//       const result = await getReviews(restaurantName);
//       if (result.status === 'ok') {
//         setReviewData(result.data);
//         // console.log(result.data);
//       } else {
//         setReviewData(reviewDataLocal);
//         // console.log("Failed to fetch reviews");
//       }
//     };

//     fetchReviews();
//   }, [name]);

  

//   return (
//     <div className="resprofile">
//       <Card name={name} description={description} rating={rating} image={image} hour={hour} locs={locs} contact={contact} />
//       <section className="reviews">
//         <h4>Add your reviews</h4>
//         <div className="reviewStat">

//           <div>
//             <p>Reviews:</p>
//             <p>{rating} / {numOfReviews}</p>
//           </div>

//           <div>
//             <p>Rate me:</p>
//             <div className="stars">
//               {[1, 2, 3, 4, 5].map((star, index) => (
//                 <span
//                   key={index}
//                   className={`fa fa-star ${userRating >= star ? "checked" : ""}`}
//                   onClick={() => handleRating(star)}
//                 ></span>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className='writeReivews'>
//             <textarea
//             value={reviewText}
//             onChange={handleTextChange}
//             placeholder="Write your review here..."
//             ></textarea>
//              <button onClick={handleSummitedReview}> submit </button>

//         </div>
//       </section>

//       <section className='reviewHistory'>
//               <h1> Reviews </h1>
//               <div>
//                 {
//                     reviewData.map((data, index)=>(
//                         <div key={index} style={{marginBottom: '30px'}} > 
//                             <div className='profileInfo'>
//                                 <img src={userIcon} width={70} height={70} alt='user profile icon'/>
//                                 <div> 
//                                     <p> {data.first_name}</p>
//                                     <p> Rated: {data.star}</p>
//                                     <p> Date: {data.time_date}</p>
//                                 </div>
//                             </div>
//                             <div>
//                                 <p style={{fontSize: 'small'}}>{data.description}</p>
//                             </div>
//                         </div>
//                     ))
//                 }
//               </div>
//       </section>
//     </div>
//   );
// }

// export default ResProfile;


const reviewDataLocal = [
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