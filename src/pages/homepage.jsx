import React from "react";
import { Link } from "react-router-dom";
import "../styles/homepage.css";
import homepageImg from "../assets/homepage.png";
import logoImg from "../assets/logo.png";

const HomePage = () => {
  return (
    <>
      {/* Sidebar fixed kiri */}
      <div
        id="sidebar-wrapper"
        style={{
          width: "280px",
          minHeight: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          backgroundColor: "#f8f9fa",
          borderRight: "1px solid #dee2e6",
          zIndex: 1000,
          paddingTop: "20px",
        }}
      >
        <div className="sidebar-heading text-center py-4">
          <img src={logoImg} alt="Memomate Logo" width={50} />
          <strong className="brand-name">Memomate</strong>
        </div>
        <div className="list-group list-group-flush">
          <Link to="/add-note" className="btn btn-purple text-white m-3">
            + Note-taking
          </Link>
          <Link
            to="/"
            className="list-group-item list-group-item-action active"
            style={{ marginTop: "50px" }}
          >
            <i className="bi bi-house-door"></i> Home
          </Link>
          <Link
            to="/view-notes"
            className="list-group-item list-group-item-action"
          >
            <i className="bi bi-journal-text"></i> Your Notes
          </Link>
        </div>
      </div>

      {/* Main content dengan margin agar tidak tertutup sidebar */}
      <div
        className="container-fluid p-4 main-content"
        style={{
          marginLeft: "280px",
          minHeight: "100vh",
          maxWidth: "1200px",
          paddingLeft: "40px",
          paddingTop: "60px",
        }}
      >
        <div className="row align-items-center">
          <div
            className="col-md-6 text-center text-md-start main-content-text"
            style={{ maxWidth: "800px" }}
          >
            <p className="lead" style={{ fontSize: "18px", fontWeight: "bold", color: "rgba(0, 0, 0, 0.616)" }}>
              <strong>
                Memomate helps you organize and take notes efficiently. Start writing now to keep your thoughts structured.
              </strong>
            </p>
            <Link to="/add-note" className="btn btn-lg btn-purple text-white" style={{ fontSize: "18px", padding: "8px 18px" }}>
              + Note-taking
            </Link>
          </div>
          <div className="col-md-6 text-center" style={{ marginTop: "20px" }}>
            <img
              src={homepageImg}
              alt="Homepage Illustration"
              className="homepage-img"
              style={{ maxWidth: "80%" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
