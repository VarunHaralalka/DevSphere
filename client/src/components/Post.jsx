import { useState, useEffect } from "react";
import axios from "axios";

const getOwnerInfo = async (owner_id) => {
  const response = await axios.get(
    `http://localhost:5000/api/users/${owner_id}`
  );
  return response.data;
};

function Post({ post }) {
  const { post_id, title, content, created_at, owner_id } = post;
  const [ownerInfo, setOwnerInfo] = useState(null);

  useEffect(() => {
    const fetchOwnerInfo = async () => {
      try {
        const data = await getOwnerInfo(owner_id);
        setOwnerInfo(data);
      } catch (error) {
        console.error("Failed to fetch owner info:", error);
      }
    };
    fetchOwnerInfo();
  }, [owner_id]);

  const username = ownerInfo ? ownerInfo.username : "Username";

  return (
    <div className="container p-4 p-md-5 mb-4 rounded text-body-emphasis bg-body-secondary">
      <div className="d-flex align-items-center mb-4">
        <a href="/profile">
          <img
            src="/assets/placeholder.jpg"
            alt="User Profile"
            className="rounded-circle me-3"
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
          />
        </a>
        <div>
          <h5 className="mb-1 fw-bold">{username}</h5>
          <small className="text-muted">{created_at.split("T")[0]}</small>
        </div>
      </div>
      <div>
        <h3 className="display-4 fst-italic">{title}</h3>
        <p className="lead my-3">{content}</p>
      </div>
    </div>
  );
}

export default Post;
