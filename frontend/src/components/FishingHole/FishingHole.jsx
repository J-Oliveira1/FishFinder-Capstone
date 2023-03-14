

const FishingHole = ({ fishingHole }) => {
  return (
    <div>
      <p>{fishingHole.username}</p>
      <p>{fishingHole.address}</p>
      <p>{fishingHole.latitude}</p>
      <p>{fishingHole.longitude}</p>
      <p>{fishingHole.parking}</p>
      <p>{fishingHole.restroom}</p>
    </div>
  );
};

export default FishingHole;