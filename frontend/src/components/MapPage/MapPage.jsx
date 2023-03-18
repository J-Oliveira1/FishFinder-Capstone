import FishingHoleForm from "../FishingHoleForm/FishingHoleForm";
import FishingHoleList from "../FishingHoleList/FishingHoleList";
import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "../MapPage/MapPage.css";
import React, { useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const libraries = ["places"];
const mapContainerStyle = {
  height: "400px",
  width: "100%",
};

const MapPage = () => {
  const { config } = useAuth();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAyEDYp5IvDtLToD8WzkDpC3-Mb4el8pR4",
    libraries,
  });
  const [fishingHoles, setFishingHoles] = useState([]);

  const handleMapClick = async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const newFishingHole = { lat, lng };
    try {
      const response = await axios.post(
        "http://localhost:8000/api/fishing_holes/",
        newFishingHole,
        {
          headers: {
            Authorization: `Bearer ${config.token}`,
          },
        }
      );
      setFishingHoles((prevHoles) => [...prevHoles, response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={{ lat: 35.743084, lng: -81.839766 }}
        onClick={handleMapClick}
      >
        {fishingHoles.map((fishingHole) => (
          <Marker
            key={fishingHole.id}
            position={{ lat: fishingHole.lat, lng: fishingHole.lng }}
          />
        ))}
      </GoogleMap>
      <h1>List of Fishing Holes</h1>
      <FishingHoleList />
      <FishingHoleForm />
    </div>
  );
};

export default MapPage;
