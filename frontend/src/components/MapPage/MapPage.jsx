import FishingHoleList from "../FishingHoleList/FishingHoleList";
import FishingHoleForm from "../FishingHoleForm/FishingHoleForm";
import { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import "../MapPage/MapPage.css";
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
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [clickedLocation, setClickedLocation] = useState(null);
  const defaultMarkerIcon = "https://maps.google.com/mapfiles/kml/paddle/red-circle.png";
  const selectedMarkerIcon = "https://maps.google.com/mapfiles/kml/paddle/grn-circle.png";

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
            position={{ lat: fishingHole.latitude, lng: fishingHole.longitude }}
            icon={selectedMarker === fishingHole ? selectedMarkerIcon : defaultMarkerIcon}
            onClick={() => highlightFishingHole(fishingHole.id)}
          >
            {selectedMarker === fishingHole && (
              <InfoWindow onCloseClick={() => setSelectedMarker(null)}>
                <div>User: {selectedMarker.username} Address: {selectedMarker.address}</div>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>
      <h1>List of Fishing Holes</h1>
      <FishingHoleList fetchFishingHoles={fetchFishingHoles} fishingHoles={fishingHoles} setFishingHoles={setFishingHoles} highlightFishingHole={highlightFishingHole}/>
      <FishingHoleForm />
    </div>
  );
};

export default MapPage;






















// import FishingHoleForm from "../FishingHoleForm/FishingHoleForm";
// import FishingHoleList from "../FishingHoleList/FishingHoleList";
// import { useEffect, useMemo } from "react";
// import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
// import "../MapPage/MapPage.css";
// import React, { useState } from "react";
// import axios from "axios";
// import useAuth from "../../hooks/useAuth";

// const libraries = ["places"];
// const mapContainerStyle = {
//   height: "400px",
//   width: "100%",
// };

// const MapPage = () => {
//   const { config } = useAuth();
//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: "AIzaSyAyEDYp5IvDtLToD8WzkDpC3-Mb4el8pR4",
//     libraries,
//   });
//   const [fishingHoles, setFishingHoles] = useState([]);
//   const [selectedMarker, setSelectedMarker] = useState(null);
//   const defaultMarkerIcon = "https://maps.google.com/mapfiles/kml/paddle/red-circle.png";
//   const selectedMarkerIcon = "https://maps.google.com/mapfiles/kml/paddle/grn-circle.png";

//   useEffect(() => {
//     fetchFishingHoles();
//   }, []);

//   // const initialFishingHoles = [
//   //   {
//   //     id: 1,
//   //     latitude: 35.743084,
//   //     longitude: -81.839766,
//   //     selected: false
//   //   },
//   //   ...
//   // ];

//   const fetchFishingHoles = async () => {
//     try {
//       const response = await axios.get(
//         "http://127.0.0.1:8000/api/fishing_holes/all/"
//       );
//       setFishingHoles(response.data);
//     } catch (error) {}
//   };

//   const handleMapClick = async (event) => {
//     const latitude = event.latLng.lat();
//     const longitude = event.latLng.lng();
//     const newFishingHole = { latitude, longitude };
//     try {
//       const response = await axios.post(
//         "http://localhost:8000/api/fishing_holes/",
//         newFishingHole,
//         {
//           headers: {
//             Authorization: `Bearer ${config.token}`,
//           },
//         }
//       );
//       setFishingHoles((prevHoles) => [...prevHoles, response.data]);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleMarkerClick = (marker) => {
//     setSelectedMarker(marker);
//   };


//   if (loadError) return "Error loading maps";
//   if (!isLoaded) return "Loading maps";

//   return (
//     <div>
//       <GoogleMap
//         mapContainerStyle={mapContainerStyle}
//         zoom={12}
//         center={{ lat: 35.743084, lng: -81.839766 }}
//         onClick={handleMapClick}
//       >
//         {fishingHoles.map((fishingHole) => (
//           <Marker
//             key={fishingHole.id}
//             position={{ lat: fishingHole.latitude, lng: fishingHole.longitude }}
//             icon={selectedMarker === fishingHole ? selectedMarkerIcon : defaultMarkerIcon}
//             onClick={() => handleMarkerClick(fishingHole)}
//           >
//             {selectedMarker === fishingHole && (
//               <InfoWindow onCloseClick={() => setSelectedMarker(null)}>
//                 <div>User: {selectedMarker.username} Address: {selectedMarker.address}</div>
//               </InfoWindow>
//             )}
//           </Marker>
//         ))}
//       </GoogleMap>
//       <h1>List of Fishing Holes</h1>
//       <FishingHoleList fetchFishingHoles={fetchFishingHoles} fishingHoles={fishingHoles} setFishingHoles={setFishingHoles} />
//       <FishingHoleForm />
//     </div>
//   );
// };

// export default MapPage;
