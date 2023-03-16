import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 40.712776,
  lng: -74.005974,
};

const GoogleMapDisplay = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback((map) => {
    setMap(map);
    setIsLoaded(true);
  }, []);

  const onUnmount = React.useCallback(() => {
    setMap(null);
    setIsLoaded(false);
  }, []);

  return (
    <LoadScript
      googleMapsApiKey="<AIzaSyC2ArtF9wrYS8TTs7bDUebm1yxx5OrY1W8>"
      libraries={["places"]}
      id="google-map-script"
    >
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {/* Child components, such as markers, here */}
        </GoogleMap>
      ) : (
        <></>
      )}
    </LoadScript>
  );
};

export default GoogleMapDisplay;