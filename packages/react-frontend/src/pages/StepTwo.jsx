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

  const handleNext = (e) => {
    e.preventDefault();
    console.log("City:", city, "State:", state);
    // Navigate to step 3
    navigate("/onboarding/step3");
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
