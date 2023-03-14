

const FishingHole = ({ fishingHole, onClick }) => {
  return (
    <div onClick={() => onClick(fishingHole)}>
      <h3>Username:  {fishingHole.username}</h3>
      <p>Address:  {fishingHole.address}</p>
      <p>Latitude:  {fishingHole.latitude}</p>
      <p>Longitude:  {fishingHole.longitude}</p>
      <p>Parking Available:  {fishingHole.parking}</p>
      <p>Restroom Available:  {fishingHole.restroom}</p>
    </div>
  );
};

export default FishingHole;