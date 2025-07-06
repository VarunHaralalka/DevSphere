import { Link } from "react-router-dom";

function Navbar() {
  //need to inclde the notifications icon and functionality later
  return (
    <nav className="navbar bg-body-tertiary" aria-label="DevSphere">
      {" "}
      <div className="container-fluid">
        {" "}
        <Link className="navbar-brand" to="/">
          DevSphere
        </Link>{" "}
        {/* Right-aligned avatar and notification icon */}
        <div className="d-flex align-items-center ms-auto">
          <button
            className="btn position-relative me-2"
            style={{ background: "none", border: "none" }}
            aria-label="Notifications"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>
          <Link
            to="/profile"
            className="btn p-0 ms-2"
            style={{
              borderRadius: "50%",
              overflow: "hidden",
              width: 40,
              height: 40,
              border: "none",
            }}
            aria-label="Profile"
          >
            <img
              src="../public/assets/placeholder.jpg"
              alt="Profile"
              style={{ width: 40, height: 40, objectFit: "cover" }}
            />
          </Link>
        </div>
      </div>{" "}
    </nav>
  );
}

export default Navbar;
