const FishPost = ({ fishPost }) => {
  return (
    <div>
      <h4>Username: {fishPost.username}</h4>
      <p>Fishing Hole: {fishPost.fishing_hole_id}</p>
      <p>Type of Fish: {fishPost.type}</p>
      <p>Size of Fish: {fishPost.size}</p>
      {fishPost.photo && (
        <img
          src={`http://127.0.0.1:8000/${fishPost.photo}`}
          alt="Fish post photo"
          style={{ maxWidth: 300 }}
        />
      )}
    </div>
  );
};

export default FishPost;
