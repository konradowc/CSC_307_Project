import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/createPost" element={<CreatePost />}/>
      </Routes>
    </Router>   
  );
}


export default App;
