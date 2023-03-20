import FishingHoleList from "../FishingHoleList/FishingHoleList";
import FishingHoleForm from "../FishingHoleForm/FishingHoleForm";
import { useEffect, useState } from "react";

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  Autocomplete,
} from "@react-google-maps/api";
import "../MapPage/MapPage.css";
import axios from "axios";

const libraries = ["places"];

const mapContainerStyle = {
  height: "400px",
  width: "100%",
};

const MapPage = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyD_woPSa-F66mqP750H4zMbKUCBQ3m_GaA",
    libraries,
  });
  const [fishingHoles, setFishingHoles] = useState([]);
  const [autocomplete, setAutocomplete] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [clickedLocation, setClickedLocation] = useState(null);
  const defaultMarkerIcon =
    "https://maps.google.com/mapfiles/kml/paddle/red-circle.png";
  const selectedMarkerIcon =
    "https://maps.google.com/mapfiles/kml/paddle/grn-circle.png";

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

  const handlePlaceSelect = (place) => {
    setSelectedPlace(place);
  };

  const handleMapClick = async (event) => {
    const latitude = event.latLng.lat();
    const longitude = event.latLng.lng();
    const clickedLocation = { latitude, longitude };
    setClickedLocation(clickedLocation);
    console.log(clickedLocation);
  };

  const handleMarkerClick = (marker) => {
    const updatedFishingHoles = fishingHoles.map((fishingHole) => {
      if (fishingHole.id === marker.id) {
        return { ...fishingHole, selected: true };
      } else {
        return { ...fishingHole, selected: false };
      }
    });
    setFishingHoles(updatedFishingHoles);
    setSelectedMarker(marker);
  };
  const highlightFishingHole = (fishingHoleId) => {
    const updatedFishingHoles = fishingHoles.map((fishingHole) => {
      if (fishingHole.id === fishingHoleId) {
        return { ...fishingHole, selected: true };
      } else {
        return { ...fishingHole, selected: false };
      }
    });
    setFishingHoles(updatedFishingHoles);
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <div className="padding " >
      <Autocomplete
        onLoad={(autocomplete) => setAutocomplete(autocomplete)}
        onPlaceChanged={() => {
          const place = autocomplete.getPlace();
          setSelectedPlace(place);
        }}
      >
        <input
          type="text"
          placeholder="Search for a location..."
          style={{ width: "100%", textAlign: "center" }}
        />
      </Autocomplete>
      <GoogleMap 
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={
          selectedPlace
            ? {
                lat: selectedPlace.geometry.location.lat(),
                lng: selectedPlace.geometry.location.lng(),
              }
            : { lat: 35.743084, lng: -81.839766 }
        }
        onClick={handleMapClick}
      >
        {fishingHoles.map((fishingHole) => (
          <Marker
            key={fishingHole.id}
            position={{ lat: fishingHole.latitude, lng: fishingHole.longitude }}
            icon={
              selectedMarker === fishingHole
                ? selectedMarkerIcon
                : defaultMarkerIcon
            }
            onClick={() => highlightFishingHole(fishingHole.id)}
          >
            {selectedMarker === fishingHole.id && (
              <InfoWindow onCloseClick={() => setSelectedMarker(null)}>
                <div>
                  User: {selectedMarker.username} Address:{" "}
                  {selectedMarker.address}
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>
      <FishingHoleForm/>
      <h2 className="border-two" >List of Fishing Holes</h2>
      <FishingHoleList 
        fetchFishingHoles={fetchFishingHoles}
        fishingHoles={fishingHoles}
        setFishingHoles={setFishingHoles}
        highlightFishingHole={highlightFishingHole}
      />
    </div>
  );
};

export default MapPage;
