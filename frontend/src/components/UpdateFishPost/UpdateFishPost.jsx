import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const UpdateFishPost = ({
  fishPost,
  setFishPosts,
  fishingHoleId,
  fishPostId,
}) => {
  const { config, user } = useAuth();
  const [updatedFishingPost, setUpdatedFishingPost] = useState(fishPost);
  const [formData, setFormData] = useState({ image: null, type: "", size: "" });
  const [previewImageUrl, setPreviewImageUrl] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setUpdatedFishingPost(fishPost);
  }, [fishPost]);

  async function updateFishingPost(data) {
    if (!user) {
      alert("You must be logged in to update a Fish Post!!");
      return;
    }
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/fishing_holes/${fishingHoleId}/fish_posts/${fishPostId}/update/`,
        data,
        config
      );
      if (response.status === 200) {
        const getResponse = await axios.get(
          `http://127.0.0.1:8000/api/fishing_holes/${fishingHoleId}/fish_posts/`,
          config
        );
        if (getResponse.status === 200) {
          // Update the state with the new data
          console.log(response);
          setFishPosts(getResponse.data);
          setUpdatedFishingPost(null);
        }
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const form_data = new FormData();
    form_data.append("photo", formData.image, formData.image.name);
    form_data.append("type", updatedFishingPost.type);
    form_data.append("size", updatedFishingPost.size);
    updateFishingPost(form_data)
      .then(() => {
        // reset form data and preview image url
        setFormData({ image: null, type: "", size: "" });
        setPreviewImageUrl(null);
        // close the form
        setVisible(false);
      })
      .catch((error) => {
        alert(`Error: ${error.message}`);
      });
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
  function handleCancel() {
    setVisible(false);
  }

  function handleUpdate() {
    setVisible(true);
  }
  return (
    <div>
      {!visible && (
        <div>
          <button type="button" onClick={handleUpdate}>
            Update
          </button>
        </div>
      )}
      {visible && (
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
              <img
                src={previewImageUrl}
                alt="Preview"
                style={{ maxWidth: 200 }}
              />
            )}
          </label>
          <button type="submit">Update</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      )}{" "}
    </div>
  );
};

export default UpdateFishPost;
