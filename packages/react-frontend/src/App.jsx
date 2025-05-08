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

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ paddingTop: "80px" }}>
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/createPost" element={<CreatePost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
