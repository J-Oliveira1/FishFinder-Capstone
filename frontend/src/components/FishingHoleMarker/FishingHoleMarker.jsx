import React from "react";
import { Marker } from "@react-google-maps/api";

const FishingHoleMarker = ({ fishingHole, onMarkerClick }) => {
  return (
    <Marker
      position={{ lat: fishingHole.lat, lng: fishingHole.lng }}
      onClick={onMarkerClick}
    />
  );
};

export default FishingHoleMarker;