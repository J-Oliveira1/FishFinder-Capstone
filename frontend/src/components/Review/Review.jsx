import "../Review/Review.css"

const Review = ({ review }) => {
    const stars = ["fa-star-o", "fa-star-o", "fa-star-o", "fa-star-o", "far-star-o"];
    for (let i = 0; i < review.rating; i++) {
        stars[i] = "fa-star";
    }

  return (
    <div>
      <h5>Username: {review.username}</h5>
      <p className="starRating"> 
         {stars.map((star, index) => (
            <i key={index} className={`fa ${star}`}></i>
        ))}
      </p>
      <p>Review: {review.text}</p>
    </div>
  );
};

export default Review;
