import { useState } from "react";
import FishingHole from "../FishingHole/FishingHole";
import DeleteFishingHole from "../DeleteFishingHole/DeleteFishingHole";
import UpdateFishingHole from "../UpdateFishingHole/UpdateFishingHole";
import CommentList from "../CommentList/CommentList";
import CommentForm from "../CommentForm/CommentForm";
import "../FishingHoleList/FishingHoleList.css";
import ReviewList from "../ReviewList/ReviewList";
import ReviewForm from "../ReviewForm/ReviewForm";

const FishingHoleList = ({ fetchFishingHoles, fishingHoles }) => {
  const [fishingHoleToUpdate, setFishingHoleToUpdate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fishing-card " >
      {fishingHoles.map((fishingHole) => (
        <div
          key={fishingHole.id}
          className={fishingHole.selected ? "selected-fishing-hole" : "fishing-hole" }
        >
          <div>
            <FishingHole 
              fishingHole={fishingHole}
              fishingHoleId={fishingHole.id}
            />
          </div>
          <div className="buttons" >

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
            </div>
          <CommentForm fishingHoleId={fishingHole.id} className="comment-form" />
          <CommentList fishingHoleId={fishingHole.id} />
          <ReviewForm fishingHoleId={fishingHole.id} />
          {isOpen && <ReviewList fishingHoleId={fishingHole.id} />}
          <button onClick={toggleOpen}>
            {isOpen ? "Hide Reviews" : "Show Reviews"}
          </button>  
        </div>
      ))}
    </div>
  );
};

export default FishingHoleList;
