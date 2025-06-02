import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../util";
import "../styles/register.css";
import takingNotes2Img from "../assets/taking_notes2.png";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      await axios.post(`${BASE_URL}/users`, {
        email,
        password,
      });

      alert("Registrasi berhasil!");
      navigate("/login_page");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg || "Registrasi gagal.");
      } else {
        setMsg("Terjadi kesalahan pada koneksi.");
      }
    }
  };

  return (
    <div className="container">
      <div className="login-form">
        <h1>Register</h1>
        <form onSubmit={handleRegister}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Inputkan alamat email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Inputkan password"
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="login-btn">REGISTER</button>

          <div className="signup-link">
            Sudah punya akun? <Link to="/login_page">Login</Link>
          </div>
        </form>

        {msg && <p id="registerMessage">{msg}</p>}
      </div>

      <div className="image-container">
        <img src={takingNotes2Img} alt="Taking Notes" />
      </div>
    </div>
  );
};

export default Register;
