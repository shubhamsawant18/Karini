"use client";
import { useState } from "react";
import "../app/styles/Home.css"; // Ensure correct CSS path
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  // Signup state
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Login state
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  // Handle signup
  const handleSignup = (e) => {
    e.preventDefault();
    router.push("/login"); // Redirect after signup
  };

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login clicked");
  };

  return (
    <div className="karini-page-container">
      <h1 className="karini-title">Welcome to our Shop</h1>
      <div className="karini-forms-container">
        {/* Signup Box */}
        <div className="karini-box karini-signup-box">
          <h2 className="karini-header">Sign Up</h2>
          <p className="karini-text">Join us today!</p>
          <form onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Username"
              value={signupData.username}
              onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
              className="karini-input"
            />
            <input
              type="email"
              placeholder="Email"
              value={signupData.email}
              onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
              className="karini-input"
            />
            <input
              type="password"
              placeholder="Password"
              value={signupData.password}
              onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
              className="karini-input"
            />
            <button type="submit" className="karini-button">Sign Up</button>
          </form>
        </div>

        {/* Login Box */}
        <div className="karini-box karini-login-box">
          <h2 className="karini-header">Login</h2>
          <p className="karini-text">Already a member? Login here.</p>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={loginData.username}
              onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
              className="karini-input"
            />
            <input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              className="karini-input"
            />
            <button type="submit" className="karini-button">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}
