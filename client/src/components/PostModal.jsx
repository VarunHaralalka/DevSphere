import { useState } from "react";
import axios from "axios";

const PostModal = ({ open, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [lookingForCollab, setLookingForCollab] = useState(false);

  if (!open) return null;

  const handlePost = (e) => {
    e.preventDefault();
    onSubmit({ title, content, lookingForCollab });
    setTitle("");
    setContent("");
    setLookingForCollab(false);
  };

  return (
    <div
      className="modal fade show"
      tabIndex="-1"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.3)" }}
      onClick={onClose}
    >
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <form className="modal-content" onSubmit={handlePost}>
          <div className="modal-header">
            <h5 className="modal-title">Create a Post</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                placeholder="What's on your mind?"
                value={content}
                required
                rows={4}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="collabCheck"
                checked={lookingForCollab}
                onChange={(e) => setLookingForCollab(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="collabCheck">
                Looking for a collab?
              </label>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostModal;
