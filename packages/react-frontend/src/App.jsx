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
import { loginUser, signupUser } from "./Security";
import StepOne from "./pages/StepOne";
import StepTwo from "./pages/StepTwo";
import StepThree from "./pages/StepThree";

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
        <Route element={<WithNavbar />}>
          <Route path="/" />
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
        </Route>

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
