import axios from "axios";
import useAuth from "../../hooks/useAuth";

const DeleteFishPost = ({ id, ondelete, fishingHoleId }) => {
  const { config } = useAuth();
  
  const deleteFishPost = async () => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/fishing_holes/${fishingHoleId}/fish_posts/${id}/delete/`,
        {
          headers: {
            "content-type": "multipart/form-data",
            ...config.headers,
          },
        }
      );
      ondelete(id);
    } catch (error) {}
  };
  
  return <button onClick={deleteFishPost}>Delete</button>;
};

export default DeleteFishPost;