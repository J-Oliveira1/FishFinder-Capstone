import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        <h3>Username: {fishingHole.username}</h3>
        <p>Fishing Hole ID: {fishingHoleId}</p>
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
