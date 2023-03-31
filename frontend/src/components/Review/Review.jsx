const Review = ({ review }) => {
    return ( 
        <div>
           <h5>Username: {review.username}</h5> 
           <p>Review: {review.text}</p>
           <p>Rating: {review.rating}</p>

        </div>
     );
}
 
export default Review;