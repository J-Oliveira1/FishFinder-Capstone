import React from "react";

const FishPost = ({ fishPost }) => {
  return (
    <div>
      <h4>Username: {fishPost.username}</h4>
      <p>Fishing Hole: {fishPost.fishing_hole_id}</p>
      <p>Type of Fish: {fishPost.type}</p>
      <p>Size of Fish: {fishPost.size}</p>
      <p>{fishPost.photo}</p>
    </div>
  );
};

export default FishPost;
