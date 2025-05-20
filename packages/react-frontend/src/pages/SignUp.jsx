import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  // should configure the handleSignUp so that it sends a post to the backend

  // the flow should be that this page creates the email and password
  // step1 then creates the username
  // step2 records the city and state
  // step3 post the data to the server and get the user going in the home page

  // how authentication is going to work is that this page creates a barebones user
  // when the user is created, the rest of the steps will then patch in the following information for the user
  // will probably add a thing where if they somehow skip all the steps have it so that they can't do anything until the rest of the info is filled in
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      alert("Passwords do not match!");
      return;
    }
    //console.log("Signing up:", { email, password }); // will need to remove this once it is set up
    // TODO: send to backend
    // start by posting the information to registerUser in auth.js
    // then route to /onboarding/step1
    try {
      const response = await fetch(
        "http://localhost:8000/signup",
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
      // may add more
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="avatar"></div>
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
