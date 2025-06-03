import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";
import postcodeLogo from "../assets/postcodeLogo.svg";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const BACKEND_URL =
  typeof import.meta !== 'undefined' &&
  import.meta.env &&
  import.meta.env.VITE_BACKEND_URL
    ? import.meta.env.VITE_BACKEND_URL
    : 'https://localhost:8000';

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(
        BACKEND_URL + `/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, pwd: password })
        }
      );

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem("authToken", token);
        navigate("/onboarding/step1");
      } else {
        const errorText = await response.text();
        throw new Error(errorText);
      }
    } catch (error) {
      console.error("error signing up");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <img
          src={postcodeLogo}
          alt="Postcode logo"
          className="logo-image"
        />
        <h1 className="auth-title">Sign Up</h1>

        <form onSubmit={handleSignUp}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Confirm Password</label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />

          <button type="submit">Sign Up</button>
        </form>

        <p className="auth-switch">
          Already have an account with us?{" "}
          <span onClick={() => navigate("/signin")}>
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}
