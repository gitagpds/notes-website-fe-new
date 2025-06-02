import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/login.css";
import takingNotesImg from "../assets/taking_notes.png";
import { BASE_URL } from "../util";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      // pakai BASE_URL di sini, pastikan BASE_URL di util.js sudah ada dan ada trailing slash di akhir
      const response = await fetch(`${BASE_URL}login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("token", result.token);
        alert("Login berhasil!");
        navigate("/home_page"); // sesuaikan route-nya kalau beda
      } else {
        setMsg(result.message || "Login gagal");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMsg("Terjadi kesalahan saat login.");
    }
  };

  return (
    <div className="container">
      <div className="login-form">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            placeholder="Inputkan alamat email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Inputkan password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="login-btn">LOGIN</button>

          <div className="signup-link">
            Doesn't have an account yet? <Link to="/register_page">Sign Up</Link>
          </div>
        </form>

        {msg && <p id="loginMessage">{msg}</p>}
      </div>

      <div className="image-container">
        <img src={takingNotesImg} alt="Taking Notes" />
      </div>
    </div>
  );
};

export default Login;
