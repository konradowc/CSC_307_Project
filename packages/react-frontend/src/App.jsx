import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import CreatePost from "./CreatePost"; 
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import Profile from "./pages/Profile";

function App() {
  return (
    <div>
       <CreatePost />
    </div>
    <div>
      <Profile />
    </div>
  );
}




export default App;
