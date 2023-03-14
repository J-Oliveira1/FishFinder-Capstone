import { useState, useEffect } from "react";
import axios from "axios";
import FishingHole from "../FishingHole/FishingHole";
import DeleteFishingHole from "../DeleteFishingHole/DeleteFishingHole";
import UpdateFishingHole from "../UpdateFIshingHole/UpdateFishingHole";


const FishingHoleList = () => {
  const [fishingHoles, setFishingHoles] = useState([]);
  const [fishingHoleToUpdate, setFishingHoleToUpdate] = useState(null);

  useEffect(() => {
    fetchFishingHoles();
  }, []);

  const fetchFishingHoles = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/fishing_holes/all/"
      );
      setFishingHoles(response.data);
    } catch (error) {}
  };

  return (
    <div>
      {fishingHoles.map((hole) => (
        <div key={hole.id}>
          <FishingHole fishingHole={hole} />
          <DeleteFishingHole id={hole.id} ondelete={fetchFishingHoles} />
          <button onClick={() => setFishingHoleToUpdate(hole)}>Update</button>
        </div>
      ))}
      {fishingHoleToUpdate && (
        <UpdateFishingHole
          fishingHole={fishingHoleToUpdate}
          setFishingHoleToUpdate={setFishingHoleToUpdate}
          onupdate={fetchFishingHoles}
        />
      )}
    </div>
  );
};

export default FishingHoleList; 

































// import { useState, useEffect } from "react";
// import axios from "axios";
// import FishingHole from "../FishingHole/FishingHole";
// import DeleteFishingHole from "../DeleteFishingHole/DeleteFishingHole";
// import UpdateFishingHole from "../UpdateFIshingHole/UpdateFishingHole";


// const FishingHoleList = () => {
//   const [fishingHoles, setFishingHoles] = useState([]);

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

//   return (
//     <div>
//       {fishingHoles.map((hole) => (
//         <div key={hole.id}>
//           <FishingHole fishingHole={hole} />
//           <DeleteFishingHole id={hole.id} ondelete={fetchFishingHoles} />
//           <UpdateFishingHole id={hole.id} ondelete={fetchFishingHoles}/>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FishingHoleList;
