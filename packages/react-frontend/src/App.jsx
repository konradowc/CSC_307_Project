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
import Explore from "./pages/Explore";
import Settings from "./pages/Settings";
import EditAccount from "./pages/EditAccount";
import OtherProfile from "./pages/OtherProfile";

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
  const INVALID_TOKEN = "INVALID_TOKEN";
  const [token, setToken] = useState(INVALID_TOKEN);
  const [message, setMessage] = useState("");

  return (
    <Router>
      <Routes>
        {/* Auth pages */}
        <Route path="/" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Onboarding pages */}
        <Route path="/onboarding/step1" element={<StepOne />} />
        <Route path="/onboarding/step2" element={<StepTwo />} />
        <Route
          path="/onboarding/step3"
          element={<StepThree />}
        />

        {/* all other routes use the nav bar */}
        <Route element={<WithNavbar />}>
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/otherprofile"
            element={<OtherProfile />}
          />

          <Route path="/settings" element={<Settings />} />
          <Route
            path="/editAccount"
            element={<EditAccount />}
          />
          <Route path="/createPost" element={<CreatePost />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
