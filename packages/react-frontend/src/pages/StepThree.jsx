import React from "react";
import { useNavigate } from "react-router-dom";
import postcodeLogo from "../assets/postcodeLogo.svg";
import "./Onboarding.css";
import threeOfThree from "../assets/3of3.svg";

const StepThree = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/"); // or "/" or "/home"
  };

  return (
    <div className="onboarding-container">
      <img
        src={postcodeLogo}
        alt="Postcode logo"
        className="logo-image"
      />

      <img
        src={threeOfThree}
        alt="step 3 of 3"
        className="step-img"
      />

      <h1>Congrats Jane!</h1>
      <p className="subtext">You're all set!</p>

      <button onClick={handleStart} className="next-button">
        Start
      </button>
    </div>
  );
};

export default StepThree;
