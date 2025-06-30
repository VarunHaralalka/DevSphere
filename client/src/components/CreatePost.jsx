import React, { useState } from "react";
import PostModal from "./PostModal";

// Avatar component (Bootstrap rounded-circle class)
const Avatar = ({ src, alt }) => (
  <img
    src={src}
    alt={alt}
    className="rounded-circle me-3"
    width={48}
    height={48}
    style={{ objectFit: "cover", border: "2px solid #dee2e6" }}
  />
);

const AddPostBar = ({ user }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handlePostSubmit = (postData) => {
    // Handle post submission (API call, state update, etc.)
    setModalOpen(false);
  };

  return (
    <div className="container">
      {/* Top Bar */}
      <div
        className="d-flex align-items-center p-3 rounded shadow-sm mb-4"
        id="add-post-bar"
      >
        <a href="/profile">
          <Avatar
            src={user?.avatarUrl || "/assets/placeholder.jpg"}
            alt={user?.name || "User Avatar"}
          />
        </a>
        <button
          type="button"
          className="btn btn-light flex-grow-1 text-start ps-4 rounded-pill border"
          id="start-post-btn"
          onClick={() => setModalOpen(true)}
        >
          Start a post
        </button>
      </div>
      <PostModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handlePostSubmit}
      />
    </div>
  );
};

export default AddPostBar;
