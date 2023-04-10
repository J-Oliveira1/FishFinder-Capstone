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
  const [openCommentLists, setOpenCommentLists] = useState([]);
  const [openReviewLists, setOpenReviewLists] = useState([]);

  const toggleCommentList = (fishingHoleId) => {
    setOpenCommentLists((prevOpenCommentLists) => {
      if (prevOpenCommentLists.includes(fishingHoleId)) {
        return prevOpenCommentLists.filter((id) => id !== fishingHoleId);
      } else {
        return [...prevOpenCommentLists, fishingHoleId];
      }
    });
  };

  const toggleReviewList = (fishingHoleId) => {
    setOpenReviewLists((prevOpenReviewLists) => {
      if (prevOpenReviewLists.includes(fishingHoleId)) {
        return prevOpenReviewLists.filter((id) => id !== fishingHoleId);
      } else {
        return [...prevOpenReviewLists, fishingHoleId];
      }
    });
  };

  return (
    <div className="fishing-card ">
      {fishingHoles.map((fishingHole) => (
        <div
          key={fishingHole.id}
          className={
            fishingHole.selected ? "selected-fishing-hole" : "fishing-hole"
          }
        >
          <div>
            <FishingHole
              fishingHole={fishingHole}
              fishingHoleId={fishingHole.id}
            />
          </div>
          <div className="buttons">
            {fishingHoleToUpdate && (
              <UpdateFishingHole
                fishingHole={fishingHoleToUpdate}
                setFishingHoleToUpdate={setFishingHoleToUpdate}
                onupdate={fetchFishingHoles}
              />
            )}
            <DeleteFishingHole
              id={fishingHole.id}
              ondelete={fetchFishingHoles}
            />
            <button onClick={() => setFishingHoleToUpdate(fishingHole)}>
              Update
            </button>
          </div>
          <CommentForm
            fishingHoleId={fishingHole.id}
            className="comment-form"
          />
          <button onClick={() => toggleCommentList(fishingHole.id)}>
            {openCommentLists.includes(fishingHole.id)
              ? "Hide Comments"
              : "View Comments"}
          </button>
          {openCommentLists.includes(fishingHole.id) && (
            <CommentList fishingHoleId={fishingHole.id} />
          )}
          <ReviewForm fishingHoleId={fishingHole.id} />
          <button onClick={() => toggleReviewList(fishingHole.id)}>
            {openReviewLists.includes(fishingHole.id)
              ? "Hide Reviews"
              : "View Reviews"}
          </button>
          {openReviewLists.includes(fishingHole.id) && (
            <ReviewList fishingHoleId={fishingHole.id} />
          )}
        </div>
      ))}
    </div>
  );
};

export default FishingHoleList;
