import { useState } from "react";
import FishingHole from "../FishingHole/FishingHole";
import DeleteFishingHole from "../DeleteFishingHole/DeleteFishingHole";
import UpdateFishingHole from "../UpdateFishingHole/UpdateFishingHole";
import CommentList from "../CommentList/CommentList";
import CommentForm from "../CommentForm/CommentForm";
import "../FishingHoleList/FishingHoleList.css";

const FishingHoleList = ({ fetchFishingHoles, fishingHoles }) => {
  const [fishingHoleToUpdate, setFishingHoleToUpdate] = useState(null);

  return (
    <div>
      {fishingHoles.map((fishingHole) => (
        <div
          key={fishingHole.id}
          className={fishingHole.selected ? "selected-fishing-hole" : ""}
        >
          <div>
            <FishingHole
              fishingHole={fishingHole}
              fishingHoleId={fishingHole.id}
            />
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
