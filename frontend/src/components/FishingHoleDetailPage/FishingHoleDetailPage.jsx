import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FishPost from "../FishPost/FishPost";
import FishPostForm from "../FishPostForm/FishPostForm";
import "../FishingHoleDetailPage/FishingHoleDetailPage.css";

const FishingHoleDetailPage = () => {
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
      <h3 className="fishing-holeid">Fishing Hole: {fishingHoleId}</h3>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ flex: "1", marginRight: "20px" }}>
        <div>
            {biggestFishPost && (
              <div className="winner">
                <h3>Biggest Fish!</h3>
                <h4>Username: {biggestFishPost?.username}</h4>
                <p>Type of Fish: {biggestFishPost?.type}</p>
                <p>Size of Fish: {biggestFishPost?.size} LBS</p>
              </div>
            )}
          </div>
          <FishPostForm
            fishingHoleId={fishingHoleId}
            setFishPosts={setFishPosts}
            handleNewPost={handleNewPost}
            userFishPost={userFishPost}
            biggestFishPost={biggestFishPost}
          />

        </div>
        <div style={{ flex: "1" }}>
          <h3 className="fishing-postid">Fish Posts</h3>
          <div className="fish-posts">
            {fishPosts.map((fishPost) => (
              <div key={fishPost.id} className="card-1">
                <FishPost className="border-2"
                  fishPost={fishPost}
                  fishingHoleId={fishingHoleId}
                  setFishPosts={setFishPosts}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ marginBottom: "50px" }}></div>
    </div>
  );
};

export default FishingHoleDetailPage;
