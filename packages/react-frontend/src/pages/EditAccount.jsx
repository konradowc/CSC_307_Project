import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Settings.css";
import editIcon from "../assets/pen-line.svg";

const EditAccount = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    city: "",
    state: ""
  });

  const [profileImage, setProfileImage] = useState(null);
  const [profileID, setprofileID] = useState(null);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    fetch("http://localhost:8000/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        const formUser = data.user;
        setFormData({
          username: formUser.name,
          email: formUser.email,
          city: formUser.city,
          state: formUser.state
        });
        setProfileImage(formUser.profile_picture || null);
        setprofileID(formUser.profile_picture_id || null);
      })
      .catch(console.error);
  }, []);

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

  const handleSave = async () => {
    console.log("Saving:", formData, profileImage);
    // TODO: Send to backend

    // start by trying to upload the profileimage
    // if profileimage is not null, delete the image, then post in the new one and take response and put it in with formdata
    // this uploads the profile picture

    try {
      const response = await fetch(
        "http://localhost:8000/users",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(formData)
          // need to figure out how to patch in the profile image
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Failed to update user."
        );
      }

      const data = await response.json();
      console.log("User updated successfully:", data.user);
      navigate("/settings");
    } catch (error) {
      console.error("Error updating user:", error.message);
    }
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
                  src={
                    typeof profileImage === "string"
                      ? profileImage
                      : URL.createObjectURL(profileImage)
                  }
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
              <p>{formData.email}</p>
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
