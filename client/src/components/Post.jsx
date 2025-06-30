function Post() {
  return (
    <div className="container">
      <div className="p-4 p-md-5 mb-4 rounded text-body-emphasis bg-body-secondary">
        <div className="px-0">
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
              <h5 className="mb-1 fw-bold">Username</h5>
              <small className="text-muted">Posted 2 hours ago</small>
            </div>
          </div>
          <div>
            <h1 className="display-4 fst-italic">
              Title of a longer featured blog post
            </h1>
            <p className="lead my-3">
              Multiple lines of text that form the lede, informing new readers
              quickly and efficiently about what's most interesting in this
              post's contents.
            </p>
            <p className="lead mb-0">
              <a href="#" className="text-body-emphasis fw-bold">
                Continue reading...
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
