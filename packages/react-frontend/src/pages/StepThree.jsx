import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import postcodeLogo from "../assets/postcodeLogo.svg";
import "./Onboarding.css";
import threeOfThree from "../assets/3of3.svg";

const StepThree = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const BACKEND_URL =
  typeof import.meta !== 'undefined' &&
  import.meta.env &&
  import.meta.env.VITE_BACKEND_URL
    ? import.meta.env.VITE_BACKEND_URL
    : 'https://localhost:8000';

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    fetch(BACKEND_URL + `/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        const user = data.user;
        setUsername(user.name || "there");
      })
      .catch((err) => {
        console.error("Error fetching user info:", err);
        setUsername("there"); // fallback in case of error
      });
  }, []);

  const handleStart = () => {
    navigate("/explore"); // or "/" or "/home"
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

      <div className="form-section">
        <h1>Congrats {username}!</h1>
        <p className="subtext">You're all set!</p>

        <button onClick={handleStart} className="next-button">
          Start
        </button>
      </div>
    </div>
  );
};

export default StepThree;
