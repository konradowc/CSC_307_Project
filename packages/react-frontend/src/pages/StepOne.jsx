import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import "./Onboarding.css";
import oneOfThree from "../assets/1of3.svg";
import postcodeLogo from "../assets/postcodeLogo.svg";

const StepOne = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate(); // hook for navigation

  const handleNext = async (e) => {
    e.preventDefault();
    console.log("Username:", username);
    const token = localStorage.getItem("authToken");
    const updates = { username }; // will need to add a validation that username is not empty

    if (username.length === 0) {
      // will need to make this better eventually
      console.error("need a username");
      alert("please put in a username");
      return;
    }

    // use finduserbyemail and update function that will be implemented in backend
    // will use a general patch and then can copy paste logic for steps two and three

    // see if this works
    try {
      const response = await fetch(
        "http://localhost:8000/users",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(updates)
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
      navigate("/onboarding/step2");
    } catch (error) {
      console.error("Error updating user:", error.message);
    }

    // Navigate to Step Two
  };

  return (
    <div className="onboarding-container">
      <img
        src={postcodeLogo}
        alt="Postcode logo"
        className="logo-image"
      />
      <img
        src={oneOfThree}
        alt="step 1 of 3"
        className="step-img"
      />

      <h1>Welcome! First things first...</h1>
      <p className="subtext">
        P.S. You can always change this later.
      </p>

      <form onSubmit={handleNext}>
        <div className="form-wrapper">
          <InputField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="submit" className="next-button">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepOne;
