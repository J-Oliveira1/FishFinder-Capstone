

const FishingHole = ({ fishingHole }) => {
  return (
    <div>
      <h3>{fishingHole.username}</h3>
      <p>{fishingHole.address}</p>
      <p>{fishingHole.latitude}</p>
      <p>{fishingHole.longitude}</p>
      <p>{fishingHole.parking}</p>
      <p>{fishingHole.restroom}</p>
    </div>
  );
};

export default FishingHole;