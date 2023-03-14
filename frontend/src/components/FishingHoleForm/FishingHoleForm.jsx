import React, { useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const FishingHoleForm = () => {
  const { config } = useAuth();
  const [formData, setFormData] = useState({
    address: "",
    latitude: "",
    longitude: "",
    parking: "",
    restroom: "",
  });

  async function createFishingHole(newFishingHole) {
    const response = await axios.post(
      `http://127.0.0.1:8000/api/fishing_holes/`,
      newFishingHole,
      config
    );
    if (response.status === 201) {
      console.log(response);
      window.location.reload();
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    createFishingHole(formData);
    setFormData({
      address: "",
      latitude: "",
      longitude: "",
      parking: "",
      restroom: "",
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Fishing Hole</h3>
      <label>
        Address:
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Latitude:
        <input
          type="text"
          name="latitude"
          value={formData.latitude}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Longitude:
        <input
          type="text"
          name="longitude"
          value={formData.longitude}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Parking:
        <input
          type="text"
          name="parking"
          value={formData.parking}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Restroom:
        <input
          type="text"
          name="restroom"
          value={formData.restroom}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Add Fishing Hole</button>
    </form>
  );
};

export default FishingHoleForm;
