import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const UpdateFishPost = ({
  fishPost,
  fishingHoleId,
  fishPostId,
  setFishPostToUpdate,
}) => {
  const { config } = useAuth();
  const [updatedFishingPost, setUpdatedFishingPost] = useState(fishPost);
  const [formData, setFormData] = useState({ image: null, type: "", size: "" });

  useEffect(() => {
    setUpdatedFishingPost(fishPost);
  }, [fishPost]);

  const updateFishingPost = (data) => {
    const url = `http://127.0.0.1:8000/api/fishing_holes/${fishingHoleId}/fish_posts/${fishPostId}/update/`;
    axios
      .put(url, data, {
        headers: {
          "content-type": "multipart/form-data",
          ...config.headers,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  function handleSubmit(event) {
    event.preventDefault();
    const form_data = new FormData();
    form_data.append("photo", formData.image, formData.image.name);
    form_data.append("type", updatedFishingPost.type);
    form_data.append("size", updatedFishingPost.size);
    updateFishingPost(form_data);
  }
  function handleCancel() {
    setFishPostToUpdate(null);
  }

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };
  return (
    <form onSubmit={handleSubmit}>
      <h3>Update Fish Post</h3>
      <label>
        Type of Fish:
        <input
          type="text"
          name="type"
          value={updatedFishingPost.type}
          onChange={(e) =>
            setUpdatedFishingPost({
              ...updatedFishingPost,
              type: e.target.value,
            })
          }
        />
      </label>
      <label>
        Size of Fish:
        <input
          type="text"
          name="size"
          value={updatedFishingPost.size}
          onChange={(e) =>
            setUpdatedFishingPost({
              ...updatedFishingPost,
              size: e.target.value,
            })
          }
        />
      </label>
      <label>
        Photo:
        <input
          type="file"
          name="image"
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
          required
        />
      </label>
      <button type="submit">Update</button>
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
};

export default UpdateFishPost;
