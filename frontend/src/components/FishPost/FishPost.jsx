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
    <div className="fishing-card">
      <div className="fishing-hole ">

      <h4>Username: {fishPost?.username}</h4>
      <p>Type of Fish: {fishPost?.type}</p>
      <p>Size of Fish: {fishPost?.size} LBS</p>
      {fishPost?.photo && (
        <img
        src={`http://127.0.0.1:8000/${fishPost.photo}`}
        alt="Fish post photo"
        style={{ maxWidth: 300, maxHeight: 300 }}
        />
        )}
        <div className="buttons"> 

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
        </div>
        </div>
    </div>
  );
};

export default FishPost;
