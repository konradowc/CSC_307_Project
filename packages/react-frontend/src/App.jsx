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
import Login from "./pages/Login";
import { loginUser, signupUser } from "./Security"; // added routes for security but team may want to change it

function App() {
  const INVALID_TOKEN = "INVALID_TOKEN";
  const [token, setToken] = useState(INVALID_TOKEN);
  const [message, setMessage] = useState("");

  return (
    <Router>
      <Navbar />
      <div style={{ paddingTop: "80px" }}>
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/createPost" element={<CreatePost />} />
          <Route
            path="/login"
            element={<Login handleSubmit={loginUser} />}
          />
          <Route
            path="/signup"
            element={
              <Login
                handleSubmit={signupUser}
                buttonLabel="Sign Up"
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
