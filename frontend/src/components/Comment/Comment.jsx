const Comment = ({ comment }) => {
  return (
    <div>
      <h5>Username: {comment.username}</h5>
      <p>Comment: {comment.text}</p>
    </div>
  );
};

export default Comment;
