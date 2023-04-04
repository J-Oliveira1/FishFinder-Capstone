import React, { useState, useEffect } from "react";
import Review from "../Review/Review";
import axios from "axios";

const ReviewList = ({ fishingHoleId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/fishing_holes/${fishingHoleId}/reviews/`
      );
      setReviews(response.data);
    } catch (error) {}
  };

  return (
    <div>
      <h4>Reviews:</h4>
      {reviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </div>
  );
};

export default ReviewList;
