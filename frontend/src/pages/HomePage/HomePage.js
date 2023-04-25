import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import "../HomePage/HomePage.css"


const HomePage = () => {
  const { user, token, config } = useAuth();
  const [fishingSpots, setFishingSpots] = useState();

  useEffect(() => {
    const fetchFishingSpots = async () => {
      try {
        let response = await axios.get(
          "http://127.0.0.1:8000/api/fishing_holes/all/",
          config
        );
        const filteredSpots = response.data.filter(
          (spot) => spot.username === user.username
        );
        setFishingSpots(filteredSpots);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchFishingSpots();
  }, [token, user.username]);

  return (
    <div className="about-us alighment">
      <h1>Welcome {user.username}!</h1>
      <h3>User Fishing Holes</h3>
      <br />

      {fishingSpots &&
        fishingSpots.map((fishingSpot) => (
          <div key={fishingSpot.id}>
            <p>Fishing Hole Id: {fishingSpot.id}</p>
            <p>Address: {fishingSpot.address}</p>
            <br />
          </div>
        ))}
    </div>
  );
};

export default HomePage;
