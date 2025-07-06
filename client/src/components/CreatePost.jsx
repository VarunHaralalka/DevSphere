import React, { useState, useEffect } from "react";
import PostModal from "./PostModal";
import { useUserStore } from "../stores/userStore";
import { userPostsStore, allPostsStore } from "../stores/postsStore";
import { Link } from "react-router-dom";
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

const AddPostBar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useUserStore();
  const { posts, getPosts, addPost } = allPostsStore();
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return (
    <div className="container">
      <div
        className="d-flex align-items-center p-3 rounded shadow-sm mb-4"
        id="add-post-bar"
      >
        <Link to="/profile">
          <Avatar
            src={user?.avatarUrl || "/assets/placeholder.jpg"}
            alt={user?.username || "User Avatar"}
          />
        </Link>
        <button
          type="button"
          className="btn btn-light flex-grow-1 text-start ps-4 rounded-pill border"
          id="start-post-btn"
          onClick={() => setModalOpen(true)}
        >
          Start a post
        </button>
      </div>
      <PostModal open={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
};

export default AddPostBar;
