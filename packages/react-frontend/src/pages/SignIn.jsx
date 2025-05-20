import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // hook for navigation

  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log("Signing in:", { email, password });

    try {
      const response = await fetch(
        "http://localhost:8000/signin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, pwd: password })
        }
      );

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem("authToken", token);
        navigate("/");
      } else {
        const errorText = await response.text();
        throw new Error(errorText);
      }
    } catch (error) {
      console.error("error signing in");
      // may add more
    }
    // TODO: send to backend
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="avatar"></div>
        <h1 className="auth-title">Sign In</h1>

        <form onSubmit={handleSignIn}>
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

          <button type="submit">Sign In</button>
        </form>

        <p className="auth-switch">
          Don’t have an account with us?{" "}
          <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
