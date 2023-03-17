import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DeleteFishPost from "../DeleteFishPost/DeleteFishPost";
import FishPost from "../FishPost/FishPost";
import FishPostForm from "../FishPostForm/FishPostForm";
import UpdateFishPost from "../UpdateFishPost/UpdateFishPost";

const FishingHoleDetailPage = ({ fishPost, }) => {
  const [fishPostToUpdate, setFishPostToUpdate] = useState(null);
  const { fishingHoleId } = useParams();
  const [fishingHole, setFishingHole] = useState([]);
  const [fishPosts, setFishPosts] = useState([]);
  
  useEffect(() => {
    fetchFishPosts(fishingHoleId);
  }, [fishingHoleId]);

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




  return (
    <div>

        <FishPostForm fishingHoleId={fishingHoleId}  />
        <h3>Fish Posts</h3>
      {fishPosts.map((fishPost) => (
          <div >
          <FishPost   key={fishPost.id} fishPost={fishPost} />

          <DeleteFishPost
            id={fishPost.id}
            onDelete={() => fetchFishPosts(fishingHoleId)}
            fishingHoleId={fishingHoleId}
          />
          <UpdateFishPost
            fishPost={fishPost}
            fishPostId={fishPost.id}
            fishingHoleId={fishingHoleId}
            setFishPostToUpdate={setFishPostToUpdate}
            setFishPosts={setFishPosts}
          />
            <br/>
            <br/>
        </div>
        
      ))}
    </div>
  );
};

export default FishingHoleDetailPage;
