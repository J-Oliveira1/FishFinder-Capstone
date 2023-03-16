import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
// Load Google Maps API script
const loadScript = (url, callback) => {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = url;
  script.onload = callback;
  document.head.appendChild(script);
};

loadScript(
  `https://maps.googleapis.com/maps/api/js?key=AIzaSyC2ArtF9wrYS8TTs7bDUebm1yxx5OrY1W8&libraries=places`,
  () => console.log("Google Maps API loaded")
);