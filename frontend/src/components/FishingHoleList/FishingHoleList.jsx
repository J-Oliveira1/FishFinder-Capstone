import { useState, useEffect } from "react";
import axios from "axios";
import FishingHole from "../FishingHole/FishingHole";
import DeleteFishingHole from "../DeleteFishingHole/DeleteFishingHole";
import UpdateFishingHole from "../UpdateFishingHole/UpdateFishingHole";
import FishPostForm from "../FishPostForm/FishPostForm";
import FishPost from "../FishPost/FishPost";
import DeleteFishPost from "../DeleteFishPost/DeleteFishPost";
import UpdateFishPost from "../UpdateFishPost/UpdateFishPost";
import CommentList from "../CommentList/CommentList";

const FishingHoleList = ({ fishPost, fishingHoleId }) => {
  const [fishingHoles, setFishingHoles] = useState([]);
  const [selectedFishingHole, setSelectedFishingHole] = useState(null);
  const [fishingHoleToUpdate, setFishingHoleToUpdate] = useState(null);
  const [fishPostToUpdate, setFishPostToUpdate] = useState(null);
  const [selectedFishPost, setSelectedFishPost] = useState(null);
  const [fishPosts, setFishPosts] = useState([]);

  useEffect(() => {
    fetchFishingHoles();
  }, []);

  const fetchFishingHoles = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/fishing_holes/all/"
      );
      setFishingHoles(response.data);
    } catch (error) {}
  };

  const handleFishPost = async (newFish, fishingHoleId) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/fishing_holes/${fishingHoleId}/fish_posts/`,
        newFish
      );
      fetchFishPosts(fishingHoleId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFishingHoleClick = async (fishingHole) => {
    if (selectedFishingHole?.id === fishingHole.id) {
      // Hides the fish posts if clicking the same fishing hole again, cleans up the page instead of having it cluttered.
      setSelectedFishingHole(null);
      setFishPosts([]);
    } else {
      setSelectedFishingHole(fishingHole);
      await fetchFishPosts(fishingHole.id);
    }
  };
  const handleFishPostClick = async (fishPost) => {
    if (selectedFishPost?.id === fishPost.id) {
      setSelectedFishPost(null);
      setFishPosts([]);
    }
  };

  const fetchFishPosts = async (fishingHoleId) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/fishing_holes/${fishingHoleId}/fish_posts/`
      );
      setFishPosts(response.data);
    } catch (error) {}
  };

  return (
    <div>
      {fishingHoles.map((fishingHole) => (
        <div key={fishingHole.id}>
          <FishingHole
            fishingHole={fishingHole}
            onClick={handleFishingHoleClick}
          />
          <CommentList fishingHoleId={fishingHole.id}/>
          <DeleteFishingHole id={fishingHole.id} ondelete={fetchFishingHoles} />
          <button onClick={() => setFishingHoleToUpdate(fishingHole)}>
            Update
          </button>
          {selectedFishingHole && (
            <div>
              {fishPosts.map((fishPost) => (
                <div key={fishPost.id}>
                  <h2>Fish Posts</h2>
                  <FishPost fishPost={fishPost} />
                  <DeleteFishPost
                    id={fishPost.id}
                    ondelete={() => fetchFishPosts(fishingHole.id)}
                    fishingHoleId={fishingHole.id}
                  />
                  <button onClick={() => setFishPostToUpdate(fishPost)}>
                    Update
                  </button>
                  {fishPostToUpdate && (
                    <UpdateFishPost
                      fishPost={fishPost}
                      fishPostId={fishPost.id}
                      fishingHoleId={fishingHole.id}
                      setFishPostToUpdate={setFishPostToUpdate}
                      setFishPosts={setFishPosts}
                    />
                  )}
                </div>
              ))}
              <FishPostForm
                fishingHoleId={fishingHole.id}
                onfishpost={handleFishPost}
              />
            </div>
          )}
        </div>
      ))}
      {fishingHoleToUpdate && (
        <UpdateFishingHole
          fishingHole={fishingHoleToUpdate}
          setFishingHoleToUpdate={setFishingHoleToUpdate}
          onupdate={fetchFishingHoles}
        />
      )}
    </div>
  );
};

export default FishingHoleList;
