import React from "react";
import { Link } from "react-router-dom";
import "../styles/homepage.css";
import homepageImg from "../assets/homepage.png";
import logoImg from "../assets/logo.png";

const HomePage = () => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="bg-light border-end" id="sidebar-wrapper">
        <div className="sidebar-heading text-center py-4">
          <img src={logoImg} alt="Memomate Logo" width="50" />
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
          <Link to="/view-notes" className="list-group-item list-group-item-action">
            <i className="bi bi-journal-text"></i> Your Notes
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-fluid p-4">
        <div className="row align-items-center">
          <div className="col-md-5 text-center text-md-start main-content-text" style={{ paddingLeft: "80px" }}>
            <p className="lead">
              <strong>
                Memomate helps you organize and take notes efficiently. Start writing now to keep your thoughts structured.
              </strong>
            </p>
            <Link to="/add-note" className="btn btn-lg btn-purple text-white">
              + Note-taking
            </Link>
          </div>
          <div className="col-md-7 text-center">
            <img
              src={homepageImg}
              alt="Homepage Illustration"
              className="img-fluid homepage-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
