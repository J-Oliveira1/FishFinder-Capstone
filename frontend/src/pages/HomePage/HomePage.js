import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";


const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const { user, token, config } = useAuth();
  const [fishingSpots, setFishingSpots] = useState();

  useEffect(() => {
    const fetchFishingSpots = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/fishing_holes/all/", config);
        setFishingSpots(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchFishingSpots();
  }, [token]);


return (
  <div className="container">
    <h1>Home Page for {user.username}!</h1>
    <h3>User Fishing Holes</h3>
    <br/>

    {fishingSpots &&
      fishingSpots.map((fishingSpot) => (
        <div key={fishingSpot.id}>
          <p>Fishing Hole Id: {fishingSpot.id}</p>
          <p>Address: {fishingSpot.address}</p>
          <br/>
          </div>
      ))}
  </div>
);
};

export default HomePage;
