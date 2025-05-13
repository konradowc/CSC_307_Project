import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import "./Onboarding.css";
import oneOfThree from "../assets/1of3.svg";
import postcodeLogo from "../assets/postcodeLogo.svg";

const StepOne = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate(); // hook for navigation

  const handleNext = (e) => {
    e.preventDefault();
    console.log("Username:", username);

    // Navigate to Step Two
    navigate("/onboarding/step2");
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
