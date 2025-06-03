import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/inputnotes.css";
import logo from "../assets/logo.png";
import { BASE_URL } from "../util";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const InputNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/add-note`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        setMessage("Catatan berhasil disimpan!");
        setTitle("");
        setContent("");
      } else {
        setMessage("Gagal menyimpan catatan.");
      }
    } catch (error) {
      setMessage("Terjadi kesalahan.");
    }
  };

  return (
    <div id="wrapper" className="d-flex">
      {/* Sidebar */}
      <div className="bg-light border-end" id="sidebar-wrapper">
        <div className="sidebar-heading text-center py-4">
          <img src={logo} alt="Memomate Logo" width="50" />
          <strong className="brand-name">Memomate</strong>
        </div>
        <div className="list-group list-group-flush">
          <Link to="/add-note" className="btn btn-purple text-white m-3">
            + Note-taking
          </Link>
          <Link
            to="/"
            className="list-group-item list-group-item-action"
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

      {/* Main Content */}
      <div
        id="page-content-wrapper"
        className="flex-grow-1"
        style={{ marginLeft: "250px", padding: "20px" }}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label fw-bold">
                    Judul
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="content" className="form-label fw-bold">
                    Catatan
                  </label>
                  <textarea
                    id="content"
                    className="form-control"
                    rows="5"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-purple w-100">
                  Simpan
                </button>
                <p
                  id="message"
                  className="text-center mt-3"
                  style={{
                    color: message.includes("berhasil") ? "green" : "red",
                  }}
                >
                  {message}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputNote;
