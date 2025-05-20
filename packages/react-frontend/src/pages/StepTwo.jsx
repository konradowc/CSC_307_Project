import React, { useState } from "react";
import InputField from "../components/InputField";
import "./Onboarding.css";
import twoOfThree from "../assets/2of3.svg";
import postcodeLogo from "../assets/postcodeLogo.svg";
import { useNavigate } from "react-router-dom";

const StepTwo = () => {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const navigate = useNavigate(); // hook for navigation

  const handleNext = async (e) => {
    e.preventDefault();
    console.log("City:", city, "State:", state);

    const token = localStorage.getItem("authToken");
    const updates = { city, state }; // need to add validation that city and state is not empty

    if (city.length === 0 || state.length === 0) {
      // will need to make this better eventually
      console.error("need city and state");
      alert("please put in a city and state");
      return;
    }

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
      // Navigate to step 3
      navigate("/onboarding/step3");
    } catch (error) {
      console.error("Error updating user:", error.message);
    }
  };

  return (
    <div className="onboarding-container">
      <img
        src={postcodeLogo}
        alt="Postcode logo"
        className="logo-image"
      />

      <img
        src={twoOfThree}
        alt="step 2 of 3"
        className="step-img"
      />

      <h1>Where are you at?</h1>
      <p className="subtext">
        P.S. You can always change this later.
      </p>

      <form onSubmit={handleNext}>
        <div className="form-wrapper">
          <InputField
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <InputField
            label="State (ex: CA)"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <button type="submit" className="next-button">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepTwo;
