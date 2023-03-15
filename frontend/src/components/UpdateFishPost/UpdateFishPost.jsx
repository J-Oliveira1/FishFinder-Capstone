import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const UpdateFishPost = ({
  fishPost,
  fishingHoleId,
  fishPostId,
  setFishPostToUpdate,
}) => {
  const { config, user } = useAuth();
  const [updatedFishingPost, setUpdatedFishingPost] = useState(fishPost);
  const [formData, setFormData] = useState({ image: null, type: "", size: "" });
  const [previewImageUrl, setPreviewImageUrl] = useState([]);

  useEffect(() => {
    setUpdatedFishingPost(fishPost);
  }, [fishPost]);

  const updateFishingPost = (data) => {
    if (!user) {
      alert("You must be logged in to update a Fish Post!!");
      return;
    }
    try {
      const response = axios.put(
        `http://127.0.0.1:8000/api/fishing_holes/${fishingHoleId}/fish_posts/${fishPostId}/update/`,
        updatedFishingPost,
        config
      );
      if (response.status === 200) {
        console.log(response);
        setUpdatedFishingPost(null);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
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
    const selectedFile = e.target.files[0];
    setFormData({ ...formData, image: selectedFile });

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      setPreviewImageUrl(reader.result);
    };
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
        {previewImageUrl && (
          <img src={previewImageUrl} alt="Preview" style={{ maxWidth: 200 }} />
        )}
      </label>
      <button type="submit">Update</button>
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
};

export default UpdateFishPost;
