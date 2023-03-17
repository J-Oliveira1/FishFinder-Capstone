import DeleteFishPost from "../DeleteFishPost/DeleteFishPost";
import UpdateFishPost from "../UpdateFishPost/UpdateFishPost";

const FishPost = ({
  fishPost,
  fishingHoleId,
  setFishPosts,
  setFishPostToUpdate,
}) => {
  const handleDelete = (id) => {
    setFishPosts((prevFishPosts) =>
      prevFishPosts.filter((fishPost) => fishPost.id !== id)
    );
  };

  return (
    <div>
      <h4>Username: {fishPost?.username}</h4>
      <p>Type of Fish: {fishPost?.type}</p>
      <p>Size of Fish: {fishPost?.size}</p>
      {fishPost?.photo && (
        <img
          src={`http://127.0.0.1:8000/${fishPost.photo}`}
          alt="Fish post photo"
          style={{ maxWidth: 300 }}
        />
      )}
      <DeleteFishPost
        id={fishPost.id}
        ondelete={handleDelete}
        fishingHoleId={fishingHoleId}
      />
      <UpdateFishPost
        fishPost={fishPost}
        fishPostId={fishPost.id}
        fishingHoleId={fishingHoleId}
        setFishPostToUpdate={setFishPostToUpdate}
        setFishPosts={setFishPosts}
      />
      <br />
      <br />
    </div>
  );
};

export default FishPost;
