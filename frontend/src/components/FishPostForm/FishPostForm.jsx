import React, { useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const FishPostForm = ({ fishingHoleId, setFishPosts, biggestFishPost }) => {
  const [numPosts, setNumPosts] = useState(0);
  const { user, config } = useAuth();
  const [formData, setFormData] = useState({
    image: null,
    type: "",
    size: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    const form_data = new FormData();
    form_data.append("photo", formData.image, formData.image.name);
    form_data.append("type", formData.type);
    form_data.append("size", formData.size);
    const url = `http://127.0.0.1:8000/api/fishing_holes/${fishingHoleId}/fish_posts/new/`;
    axios
      .post(url, form_data, {
        headers: {
          "content-type": "multipart/form-data",
          ...config.headers,
        },
      })
      .then((res) => {
        console.log(res.data);
        setFishPosts((prevFishPosts) => [...prevFishPosts, res.data]);
        setNumPosts(numPosts + 1);
        setFormData({ image: null, type: "", size: "" });
      })
      .catch((err) => console.log(err));
    if (formData.size > biggestFishPost.size) {
      alert("Congratulations! You caught the biggest fish!");
    }
  };

  return (
    <div>
      <h4>Add New Fish Post</h4>
      {user ? (
        <form onSubmit={handleSubmit}>
          <p>
            <input
              type="text"
              placeholder="Type of Fish"
              id="type"
              value={formData.type}
              onChange={handleChange}
              required
            />
          </p>
          <p>
            <input
              type="text"
              placeholder="Size of Fish"
              id="size"
              value={formData.size}
              onChange={handleChange}
              required
            />
          </p>
          <p>
            <input
              type="file"
              id="image"
              accept="image/png, image/jpeg"
              onChange={handleImageChange}
              required
            />
          </p>
          <input type="submit" />
        </form>
      ) : (
        <p>Please log in to add a new fish post.</p>
      )}
    </div>
  );
};

export default FishPostForm;
