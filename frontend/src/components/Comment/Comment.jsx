const Comment = ({ comment }) => {
  return (
    <div>
      <h5>{comment.username}</h5>
      <p>{comment.text}</p>
    </div>
  );
};

export default Comment;
