import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const CommentForm = ({ fishingHoleId }) => {
  const { config } = useAuth();
  const [formData, setFormData] = useState({
    text: "",
  });

  async function createComment(newComment) {
    const response = await axios.post(
      `http://127.0.0.1:8000/api/fishing_holes/${fishingHoleId}/comments/new/`,
      newComment,
      config
    );
    if (response.status === 201) {
      console.log(response);
      window.location.reload();
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    createComment(formData);
    setFormData({
      text: "",
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  }
  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Comment</h3>
      <label>
        Comment:
        <input
          type="text"
          name="text"
          value={formData.text}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Add Comment</button>
    </form>
  );
};

export default CommentForm;
