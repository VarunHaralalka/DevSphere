import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const getOwnerInfo = async (owner_id) => {
  const response = await axios.get(
    `http://localhost:5000/api/users/${owner_id}`
  );
  return response.data;
};

function Post({ post }) {
  const { post_id, title, content, created_at, owner_id, collab } = post;
  const [ownerInfo, setOwnerInfo] = useState(null);

  useEffect(() => {
    const fetchOwnerInfo = async () => {
      try {
        const data = await getOwnerInfo(owner_id);
        setOwnerInfo(data);
      } catch (error) {
        // handle error or ignore
      }
    };
    fetchOwnerInfo();
  }, [owner_id]);

  const username = ownerInfo ? ownerInfo.username : "Username";
  const formattedDate = created_at?.split("T")[0] ?? "";

  return (
    <div className="container p-4 p-md-5 mb-4 rounded text-body-emphasis bg-body-secondary">
      <div className="d-flex align-items-center mb-4">
        <Link to={`/profile/${owner_id}`}>
          <img
            src="/assets/placeholder.jpg"
            alt="User Profile"
            className="rounded-circle me-3"
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
          />
        </Link>
        <div>
          <h5 className="mb-1 fw-bold">
            <Link to={`/profile/${owner_id}`} className="text-decoration-none">
              {username}
            </Link>
          </h5>
          <small className="text-muted">{formattedDate}</small>
          {collab && (
            <span className="badge bg-success ms-2 align-middle">
              <i className="bi bi-people-fill me-1"></i>
              Looking for Collaborators
            </span>
          )}
        </div>
      </div>
      <div>
        <h3 className="display-4 fst-italic">{title}</h3>
        <p className="lead my-3">{content}</p>
        {collab && (
          <div className="mt-3">
            <Link
              to={`/profile/${owner_id}`}
              className="btn btn-outline-primary btn-sm d-inline-flex align-items-center"
            >
              <i className="bi bi-plus-circle me-2"></i>
              Collaborate
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Post;
