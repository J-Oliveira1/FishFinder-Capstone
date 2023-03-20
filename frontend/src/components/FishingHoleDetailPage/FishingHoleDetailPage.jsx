import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FishPost from "../FishPost/FishPost";
import FishPostForm from "../FishPostForm/FishPostForm";
import "../FishingHoleDetailPage/FishingHoleDetailPage.css"

const FishingHoleDetailPage = ({}) => {
  const { fishingHoleId } = useParams();
  const [fishPosts, setFishPosts] = useState([]);
  const [biggestFishPost, setBiggestFishPost] = useState(null);
  const [userFishPost, setUserFishPost] = useState(null);
  const [numPosts, setNumPosts] = useState(0);

  useEffect(() => {
    fetchFishPosts(fishingHoleId);
  }, [fishingHoleId, numPosts]);

  useEffect(() => {
    if (fishPosts.length > 0) {
      const biggestFishPost = fishPosts.reduce((prev, current) => {
        return prev.size > current.size ? prev : current;
      });
      setBiggestFishPost(biggestFishPost);
    }
  }, [fishPosts]);

  const fetchFishPosts = async () => {
    try {
      if (fishingHoleId) {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/fishing_holes/${fishingHoleId}/fish_posts/`
        );
        setFishPosts(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNewPost = () => {
    setNumPosts(numPosts + 1);
  };

  return (
    <div className="padding">
      <h3 className="">Fishing Hole: {fishingHoleId}</h3>
      <FishPostForm
        fishingHoleId={fishingHoleId}
        setFishPosts={setFishPosts}
        handleNewPost={handleNewPost}
        userFishPost={userFishPost}
        biggestFishPost={biggestFishPost}
      />
      <div >

      {biggestFishPost && (
        <div className="winner">
          <h3>Biggest Fish!</h3>
          <h4>Username: {biggestFishPost?.username}</h4>
          <p>Type of Fish: {biggestFishPost?.type}</p>
          <p>Size of Fish: {biggestFishPost?.size} LBS</p>
        </div>
      )}
      </div>
      <h3 className="border-1">Fish Posts</h3>
      {fishPosts.map((fishPost) => (
        <div key={fishPost.id} >
          <FishPost
            fishPost={fishPost}
            fishingHoleId={fishingHoleId}
            setFishPosts={setFishPosts}
          />
        </div>
      ))}
    </div>
  );
};

export default FishingHoleDetailPage;
