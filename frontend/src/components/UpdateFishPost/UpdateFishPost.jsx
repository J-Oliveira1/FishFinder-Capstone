import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const UpdateFishPost = ({ fishPost }) => {
  const { config } = useAuth();
  const [updatedFishingPost, setUpdatedFishingPost] = useState(fishPost);

  useEffect(() => {
    setUpdatedFishingPost(fishPost);
  }, [fishPost]);

  async function updateFishingPost(updatedFishPost) {
    const response = await axios.put(
      `http://127.0.0.1:8000/api/fishing_holes/${fishingHoleId}/fish_posts/${fishPostId}/update/`,
      updatedFishPost,
      config
    );
    if (response.status === 200) {
      console.log(response);
      setFishPostToUpdate(null);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    UpdateFishPost(updatedFishingPost);
    window.location.reload();
  }

  function handleCancel() {
    setFishPostToUpdate(null);
  }
  return null;
};

export default UpdateFishPost;
