import React, { useState, useEffect } from "react";
import Comment from "../Comment/Comment";
import axios from "axios";

const CommentList = ({ fishingHoleId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/fishing_holes/${fishingHoleId}/comments/`
      );
      setComments(response.data);
    } catch (error) {}
  };

  return (
    <div>
      <h3>Fishing Hole Comments:</h3>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
