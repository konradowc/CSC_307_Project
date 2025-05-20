import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Settings.css";

const Settings = () => {
  const navigate = useNavigate(); // hook for navigation

  const user = {
    username: "Jane Doe",
    email: "janedoe123@gmail.com",
    city: "City Name",
    state: "CA"
  };

  const handleEditClick = () => {
    navigate("/editaccount");
  };

  const handleSignOut = () => {
    // TODO: Add actual sign-out logic if needed (e.g., clearing tokens)
    navigate("/signin");
  };

  return (
    <div className="settings-container">
      <h1 className="settings-title">Settings</h1>

      <div className="settings-card">
        <div className="settings-avatar" />

        <div className="settings-info">
          <div className="settings-row">
            <div>
              <label>Username</label>
              <p>{user.username}</p>
            </div>
          </div>

          <div className="settings-row">
            <div>
              <label>Email</label>
              <p>{user.email}</p>
            </div>
          </div>

          <div className="settings-row">
            <div>
              <label>City</label>
              <p>{user.city}</p>
            </div>
            <div>
              <label>State (ex: CA)</label>
              <p>{user.state}</p>
            </div>
          </div>

          <div className="settings-actions">
            <button
              className="edit-btn"
              onClick={handleEditClick}
            >
              Edit Account Details
            </button>
            <button
              className="signout-btn"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
