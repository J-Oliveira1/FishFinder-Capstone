// General Imports

import { Routes, Route, useParams } from "react-router-dom";
import axios from "axios";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
import Test from "./components/Test/Test";
import useAuth from "./hooks/useAuth";
import { useEffect, useState } from "react";
import MapPage from "./components/MapPage/MapPage";

import FishingHoleDetailPage from "./components/FishingHoleDetailPage/FishingHoleDetailPage";

function App() {


  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/test" element={<Test />} />
        <Route
          path="/fishingholes"
          element={<MapPage  />}
        />
        <Route
          path="/fishingholes/:fishingHoleId"
          element={<FishingHoleDetailPage />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

// function App() {

//   return (
//     <div>
//       <Navbar />
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <PrivateRoute>
//               <HomePage />
//             </PrivateRoute>
//           }
//         />
//         <Route path="/register" element={<RegisterPage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/test" element={<Test />} />
//         <Route path="/fishingholes" element={<MapPage />} />
//         <Route path=`/fishingholes/${fishingHole.id}` element={<FishingHoleList />} />
//       </Routes>
//       <Footer />
//     </div>
//   );
// }

// export default App;
