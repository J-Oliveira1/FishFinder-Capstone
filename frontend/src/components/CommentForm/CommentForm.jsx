import React, { useState } from "react";
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
    <form onSubmit={handleSubmit} className="comment-1">
      <h5>Add New Comment</h5>
      <div className="comment-form">
        <label>
          Comment:
          <input
            type="text"
            name="text"
            value={formData.text}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default CommentForm;
