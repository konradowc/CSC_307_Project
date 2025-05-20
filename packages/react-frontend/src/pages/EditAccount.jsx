import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Settings.css";
import editIcon from "../assets/pen-line.svg";

const EditAccount = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "Jane Doe",
    email: "janedoe123@gmail.com",
    city: "City Name",
    state: "CA"
  });

  const [profileImage, setProfileImage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleCancel = () => {
    navigate("/settings");
  };

  const handleSave = () => {
    console.log("Saving:", formData, profileImage);
    // TODO: Send to backend
    navigate("/settings");
  };

  return (
    <div className="settings-container">
      <div className="settings-inner">
        <h1 className="settings-title">Edit Account Details</h1>

        <div className="settings-card">
          <div className="settings-avatar-wrapper">
            <input
              type="file"
              id="avatar-upload"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
            <label
              htmlFor="avatar-upload"
              className="settings-avatar"
            >
              {profileImage && (
                <img
                  src={profileImage}
                  alt="Uploaded avatar"
                  className="uploaded-avatar"
                />
              )}
              <div className="edit-avatar-overlay">
                <img
                  src={editIcon}
                  alt="edit"
                  className="edit-avatar-icon"
                />
              </div>
            </label>
          </div>

          <div className="settings-info">
            <div className="settings-row">
              <div>
                <label>Username</label>
                <input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>State (ex: CA)</label>
                <input
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="settings-row">
              <div>
                <label>Email</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="settings-row">
              <div>
                <label>City</label>
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="settings-actions">
              <button
                className="edit-btn"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="signout-btn"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAccount;
