import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useUserStore } from "../stores/userStore";
import { allPostsStore } from "../stores/postsStore";

const PostModal = ({ open, setModalOpen }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const { user } = useUserStore();
  if (!open) return null;

  function onClose() {
    setModalOpen(false);
    reset();
  }

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/api/posts", {
        ...data,
        owner_id: user.user_id,
      });
      if (response.status === 201) {
        const { addPost } = allPostsStore.getState();
        addPost(response.data);
      }
      onClose();
    } catch (error) {
      console.error("Error posting post:", error);
    }
  };

  return (
    <div
      className="modal fade show"
      tabIndex="-1"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.3)" }}
      onClick={onClose}
    >
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <form className="modal-content" onSubmit={handleSubmit(onSubmit)}>
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
                {...register("title", { required: true })}
                type="text"
                className="form-control"
                placeholder="Title"
              />
            </div>
            <div className="mb-3">
              <textarea
                {...register("content", { required: true })}
                className="form-control"
                placeholder="What's on your mind?"
                rows={4}
              />
            </div>
            <div className="form-check mb-3">
              <input
                {...register("collab")}
                className="form-check-input"
                type="checkbox"
                id="collab"
              />
              <label className="form-check-label" htmlFor="collab">
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
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostModal;
