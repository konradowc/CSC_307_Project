//App.jsx
import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet
} from "react-router-dom";

import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";
import StepOne from "./pages/StepOne";
import StepTwo from "./pages/StepTwo";
import StepThree from "./pages/StepThree";
import Settings from "./pages/Settings";
import EditAccount from "./pages/EditAccount";

function WithNavbar() {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "80px" }}>
        <Outlet />
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<WithNavbar />}>
          <Route path="/" />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route
            path="/editAccount"
            element={<EditAccount />}
          />
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
        </Route>

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
