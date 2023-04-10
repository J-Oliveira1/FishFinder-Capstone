import "../Review/Review.css"

const Review = ({ review }) => {
    const stars = ["fa-star-o", "fa-star-o", "fa-star-o", "fa-star-o", "far-star-o"];
    for (let i = 0; i < review.rating; i++) {
        stars[i] = "fa-star";
    }

  return (
<div>
  <h5 style={{ display: "inline-block", margin: "0" }}>{review.username}</h5>
  <p className="starRating" style={{ display: "inline-block", margin: "0 0 0 10px" }}>
    {stars.map((star, index) => (
      <i key={index} className={`fa ${star}`}></i>
    ))}
  </p>
  <p>{review.text}</p>
</div>
  );
};

export default Review;
