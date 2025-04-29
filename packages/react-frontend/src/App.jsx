import { useState } from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import Profile from "./pages/Profile";

function App() {
  return (
    <div>
      <Profile />
    </div>
  );
}

// const App = () => {
//   return (
//     <div>
//       <h1 className="text-2xl">Test Page</h1>
//       <p className="text-gray-700">
//         If this shows up, the issue might be in your profile
//         page.
//       </p>
//     </div>
//   );
// };

export default App;
