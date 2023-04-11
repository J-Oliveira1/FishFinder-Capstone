import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../FishingHole/FishingHole.css";

const FishingHole = ({ fishingHole, fishingHoleId }) => {
  const navigate = useNavigate();
  const [selectedFishingHole, setSelectedFishingHole] = useState(null);

  function handleClick() {
    setSelectedFishingHole(fishingHole);
    navigate(`/fishingholes/${fishingHoleId}`);
  }

  if (fishingHole) {
    return (
      <div onClick={handleClick}>
        <h4>Username: {fishingHole.username}</h4>
        <p>Fishing Hole ID: {fishingHoleId}</p>
        <p>
          Average Rating:{" "}
          {fishingHole.average_rating
            ? fishingHole.average_rating.toFixed(1)
            : 0}{" "}
          <span className="star">&#9733;</span>
        </p>
        <p>Address: {fishingHole.address}</p>
        <p>Latitude: {fishingHole.latitude}</p>
        <p>Longitude: {fishingHole.longitude}</p>
        <p>Parking Available: {fishingHole.parking}</p>
        <p>Restroom Available: {fishingHole.restroom}</p>
      </div>
    );
  }
  return null;
};

export default FishingHole;
