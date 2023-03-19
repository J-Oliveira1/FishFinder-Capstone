const Comment = ({ comment }) => {
  return (
    <div>
      <h3>Username: {comment.username}</h3>
      <p>Comment: {comment.text}</p>
    </div>
  );
};

export default Comment;
