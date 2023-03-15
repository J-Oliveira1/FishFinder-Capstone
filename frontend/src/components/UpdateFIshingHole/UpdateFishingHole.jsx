import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const UpdateFishingHole = ({ fishingHole, setFishingHoleToUpdate }) => {
  const { config, user } = useAuth();
  const [updatedFishingHole, setUpdatedFishingHole] = useState(fishingHole);

  useEffect(() => {
    setUpdatedFishingHole(fishingHole);
  }, [fishingHole]);

  async function updateFishingHole(updatedFishHole) {
    if (!user) {
      alert("You must be logged in to update a fishing hole.");
      return;
    }
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/fishing_holes/${updatedFishHole.id}/update/`,
        updatedFishHole,
        config
      );
      if (response.status === 200) {
        console.log(response);
        setFishingHoleToUpdate(null);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    updateFishingHole(updatedFishingHole);
    window.location.reload();
  }

  function handleCancel() {
    setFishingHoleToUpdate(null);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Update Fishing Hole</h3>
      <label>
        Address:
        <input
          type="text"
          name="address"
          value={updatedFishingHole.address}
          onChange={(e) =>
            setUpdatedFishingHole({
              ...updatedFishingHole,
              address: e.target.value,
            })
          }
        />
      </label>
      <br />
      <label>
        Latitude:
        <input
          type="text"
          name="latitude"
          value={updatedFishingHole.latitude}
          onChange={(e) =>
            setUpdatedFishingHole({
              ...updatedFishingHole,
              latitude: e.target.value,
            })
          }
        />
      </label>
      <br />
      <label>
        Longitude:
        <input
          type="text"
          name="longitude"
          value={updatedFishingHole.longitude}
          onChange={(e) =>
            setUpdatedFishingHole({
              ...updatedFishingHole,
              longitude: e.target.value,
            })
          }
        />
      </label>
      <br />
      <label>
        Parking:
        <input
          type="text"
          name="parking"
          value={updatedFishingHole.parking}
          onChange={(e) =>
            setUpdatedFishingHole({
              ...updatedFishingHole,
              parking: e.target.value,
            })
          }
        />
      </label>
      <br />
      <label>
        Restroom:
        <input
          type="text"
          name="restroom"
          value={updatedFishingHole.restroom}
          onChange={(e) =>
            setUpdatedFishingHole({
              ...updatedFishingHole,
              restroom: e.target.value,
            })
          }
        />
      </label>
      <br />
      <button type="submit">Update</button>
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
};

export default UpdateFishingHole;
