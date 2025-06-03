import React, { useEffect, useState } from "react";
import "../styles/viewnotes.css";
import logo from "../assets/logo.png";
import { BASE_URL } from "../util";

const ViewNotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/notes`)
      .then((res) => res.json())
      .then((data) => setNotes(data))
      .catch((err) => console.error(err));
  }, []);

  const handleView = (id) => {
    fetch(`${BASE_URL}/notes/${id}`)
      .then((res) => res.json())
      .then((note) => {
        setModalContent({
          title: "View Note",
          body: (
            <div>
              <h4>{note.title}</h4>
              <hr />
              <p style={{ whiteSpace: "pre-wrap" }}>{note.content}</p>
            </div>
          )
        });
      });
  };

  const handleEdit = (id) => {
    fetch(`${BASE_URL}/notes/${id}`)
      .then((res) => res.json())
      .then((note) => {
        setModalContent({
          title: "Edit Note",
          body: (
            <EditForm
              note={note}
              onSave={(updatedNote) => {
                fetch(`${BASE_URL}/edit-note/${id}`, {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(updatedNote),
                })
                  .then((res) => res.json())
                  .then((result) => {
                    if (result.message === "Note updated successfully") {
                      setModalContent(null);
                      window.location.reload();
                    } else {
                      alert("Failed to update note.");
                    }
                  });
              }}
            />
          )
        });
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      fetch(`${BASE_URL}/delete-note/${id}`, { method: "DELETE" })
        .then(() => window.location.reload())
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="d-flex">
      <div className="bg-light border-end" id="sidebar-wrapper">
        <div className="sidebar-heading text-center py-4">
          <img src={logo} alt="Memomate Logo" width="50" />
          <strong className="brand-name">Memomate</strong>
        </div>
        <div className="list-group list-group-flush">
          <a href="/input" className="btn btn-purple text-white m-3">
            + Note-taking
          </a>
          <a href="/" className="list-group-item list-group-item-action mt-5">
            <i className="bi bi-house-door"></i> Home
          </a>
          <a href="/view" className="list-group-item list-group-item-action active">
            <i className="bi bi-journal-text"></i> Your Notes
          </a>
        </div>
      </div>

      <div className="container-fluid p-4">
        <h2 className="text-center mb-4">YOUR NOTES</h2>
        <div className="row">
          {notes.map((note) => (
            <div className="col-md-3 mb-3" key={note.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{note.title}</h5>
                  <p className="card-text">{note.content.slice(0, 50)}...</p>
                  <button className="btn btn-sm btn-primary me-1" onClick={() => handleView(note.id)}>
                    <i className="bi bi-eye-fill"></i> View
                  </button>
                  <button className="btn btn-sm btn-warning me-1" onClick={() => handleEdit(note.id)}>
                    <i className="bi bi-pencil-fill"></i> Edit
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(note.id)}>
                    <i className="bi bi-trash-fill"></i> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalContent && (
        <div className="modal fade show" id="dynamic-modal" style={{ display: "block" }}>
          <div className="modal-dialog" style={{ maxWidth: "95%", width: "95%" }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalContent.title}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setModalContent(null)}
                ></button>
              </div>
              <div className="modal-body">{modalContent.body}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const EditForm = ({ note, onSave }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  return (
    <div>
      <input type="hidden" value={note.id} />
      <div className="mb-2">
        <label>Title</label>
        <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="mb-2">
        <label>Content</label>
        <textarea
          className="form-control"
          style={{ height: 300 }}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <button className="btn btn-success" onClick={() => onSave({ title, content })}>
        Save
      </button>
    </div>
  );
};

export default ViewNotesPage;
