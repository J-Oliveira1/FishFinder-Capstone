import axios from "axios";
import useAuth from "../../hooks/useAuth";

const DeleteFishingHole = ({ id, ondelete }) => {
  const { config } = useAuth();
  const deleteFishingHole = async () => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/fishing_holes/${id}/delete/`,
        {
          headers: {
            "content-type": "multipart/form-data",
            ...config.headers,
          },
        }
      );
      ondelete(id);
    } catch (error) {    alert(`Must be signed in to delete!`)}

  };

  return <button onClick={deleteFishingHole}>Delete</button>;
};

export default DeleteFishingHole;
