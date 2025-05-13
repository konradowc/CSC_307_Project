//App.jsx
import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import Navbar from "./components/Navbar";
import StepOne from "./pages/StepOne";
import StepTwo from "./pages/StepTwo";
import StepThree from "./pages/StepThree";

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ paddingTop: "80px" }}>
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/createPost" element={<CreatePost />} />
          <Route
            path="/onboarding/step1"
            element={<StepOne />}
          />
          <Route
            path="/onboarding/step2"
            element={<StepTwo />}
          />
          <Route
            path="/onboarding/step3"
            element={<StepThree />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
