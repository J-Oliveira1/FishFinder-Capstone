import { useState, useEffect } from "react";
import axios from "axios";
import FishingHole from "../FishingHole/FishingHole";
import DeleteFishingHole from "../DeleteFishingHole/DeleteFishingHole";
import UpdateFishingHole from "../UpdateFishingHole/UpdateFishingHole";
import CommentList from "../CommentList/CommentList";
import CommentForm from "../CommentForm/CommentForm";
import { useNavigate, Link } from "react-router-dom";
import "../FishingHoleList/FishingHoleList.css"

const FishingHoleList = ({
  fetchFishingHoles,
  fishingHoles,
  setFishingHoles,
  highlightFishingHole
}) => {
  const [fishingHoleToUpdate, setFishingHoleToUpdate] = useState(null);

  return (
    <div>
      {fishingHoles.map((fishingHole) => (
        <div
        key={fishingHole.id} className={fishingHole.selected ? "selected-fishing-hole" : ""}
        >
          <div>
            <FishingHole fishingHole={fishingHole} fishingHoleId={fishingHole.id} />
          </div>
          {fishingHoleToUpdate && (
            <UpdateFishingHole
              fishingHole={fishingHoleToUpdate}
              setFishingHoleToUpdate={setFishingHoleToUpdate}
              onupdate={fetchFishingHoles}
            />
          )}
          <DeleteFishingHole id={fishingHole.id} ondelete={fetchFishingHoles} />
          <button onClick={() => setFishingHoleToUpdate(fishingHole)}>
            Update
          </button>
          <CommentForm fishingHoleId={fishingHole.id} />
          <CommentList fishingHoleId={fishingHole.id} />
        </div>
      ))}
    </div>
  );
};

export default FishingHoleList;
























// import { useState, useEffect } from "react";
// import axios from "axios";
// import FishingHole from "../FishingHole/FishingHole";
// import DeleteFishingHole from "../DeleteFishingHole/DeleteFishingHole";
// import UpdateFishingHole from "../UpdateFishingHole/UpdateFishingHole";
// import CommentList from "../CommentList/CommentList";
// import CommentForm from "../CommentForm/CommentForm";
// import { useNavigate, Link } from "react-router-dom";

// const FishingHoleList = ({fetchFishingHoles, fishingHoles, setFishingHoles, fishingHole, fishingHoleId, selectMarker}) => {
//   // const [fishingHoles, setFishingHoles] = useState([]);
//   const [fishingHoleToUpdate, setFishingHoleToUpdate] = useState(null);
  





//   // useEffect(() => {
//   //   fetchFishingHoles();
//   // }, []);

//   // const fetchFishingHoles = async () => {
//   //   try {
//   //     const response = await axios.get(
//   //       "http://127.0.0.1:8000/api/fishing_holes/all/"
//   //     );
//   //     setFishingHoles(response.data);
//   //   } catch (error) {}
//   // };



//   return (
//     <div>
//       {fishingHoles.map((fishingHole) => (
//         <div key={fishingHole.id}>
//           <div >
//             <FishingHole fishingHole={fishingHole} fishingHoleId={fishingHole.id} />
//           </div>
//           {fishingHoleToUpdate && (
//             <UpdateFishingHole
//               fishingHole={fishingHoleToUpdate}
//               setFishingHoleToUpdate={setFishingHoleToUpdate}
//               onupdate={fetchFishingHoles}
//             />
//           )}
//           <DeleteFishingHole id={fishingHole.id} ondelete={fetchFishingHoles} />
//           <button onClick={() => setFishingHoleToUpdate(fishingHole)}>
//             Update
//           </button>
//           <CommentForm fishingHoleId={fishingHole.id} />
//           <CommentList fishingHoleId={fishingHole.id} />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FishingHoleList;




























// import { useState, useEffect } from "react";
// import axios from "axios";
// import FishingHole from "../FishingHole/FishingHole";
// import DeleteFishingHole from "../DeleteFishingHole/DeleteFishingHole";
// import UpdateFishingHole from "../UpdateFishingHole/UpdateFishingHole";
// import CommentList from "../CommentList/CommentList";
// import CommentForm from "../CommentForm/CommentForm";
// import { Link } from "react-router-dom";

// const FishingHoleList = ({ fishPost, fishingHoleId }) => {
//   const [fishingHoles, setFishingHoles] = useState([]);
//   const [selectedFishingHole, setSelectedFishingHole] = useState(null);
//   const [fishingHoleToUpdate, setFishingHoleToUpdate] = useState(null);
//   const [fishPostToUpdate, setFishPostToUpdate] = useState(null);
//   const [selectedFishPost, setSelectedFishPost] = useState(null);
//   const [fishPosts, setFishPosts] = useState([]);

//   useEffect(() => {
//     fetchFishingHoles();
//   }, []);

//   const fetchFishingHoles = async () => {
//     try {
//       const response = await axios.get(
//         "http://127.0.0.1:8000/api/fishing_holes/all/"
//       );
//       setFishingHoles(response.data);
//     } catch (error) {}
//   };

//   // const handleFishPost = async (newFish, fishingHoleId) => {
//   //   try {
//   //     const response = await axios.post(
//   //       `http://127.0.0.1:8000/api/fishing_holes/${fishingHoleId}/fish_posts/`,
//   //       newFish
//   //     );
//   //     setFishPosts((prevFishPosts) => [...prevFishPosts, response.data]);
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   // };

//   // const handleFishingHoleClick = async (fishingHole) => {
//   //   if (selectedFishingHole?.id === fishingHole.id) {
//   //     // Hides the fish posts if clicking the same fishing hole again, cleans up the page instead of having it cluttered.
//   //     setSelectedFishingHole(null);
//   //     setFishPosts([]);
//   //   } else {
//   //     setSelectedFishingHole(fishingHole);
//   //     await fetchFishPosts(fishingHole.id);
//   //   }
//   // };
//   // const handleFishPostClick = async (fishPost) => {
//   //   if (selectedFishPost?.id === fishPost.id) {
//   //     setSelectedFishPost(null);
//   //   } else {

//   //     setFishPosts([]);
//   //   }
//   // };

//   const fetchFishPosts = async (fishingHoleId) => {
//     try {
//       const response = await axios.get(
//         `http://127.0.0.1:8000/api/fishing_holes/${fishingHoleId}/fish_posts/`
//       );
//       setFishPosts(response.data.filter(post => post.fishing_hole === fishingHoleId));
//       setFishPosts(response.data);
//     } catch (error) {}
//   };

//   return (
//     <div>
//       {fishingHoles.map((fishingHole) => (
//         <div key={fishingHole.id}>
//           <Link to={`/fishingholes/${fishingHole.id}`}>
//             <FishingHole fishingHole={fishingHole} />
//           </Link>
//           {fishingHoleToUpdate && (
//             <UpdateFishingHole
//               fishingHole={fishingHoleToUpdate}
//               setFishingHoleToUpdate={setFishingHoleToUpdate}
//               onupdate={fetchFishingHoles}
//             />
//           )}
//           <DeleteFishingHole id={fishingHole.id} ondelete={fetchFishingHoles} />
//           <button onClick={() => setFishingHoleToUpdate(fishingHole)}>
//             Update
//           </button>
//           <CommentForm fishingHoleId={fishingHole.id} />
//           <CommentList fishingHoleId={fishingHole.id} />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FishingHoleList;
