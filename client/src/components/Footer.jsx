function Footer() {
  return (
    <footer className="py-3 bg-body-tertiary border-top">
      <div className="container">
        <div className="d-flex flex-wrap justify-content-between align-items-center">
          <div className="col-md-4 d-flex align-items-center">
            <span className="mb-3 mb-md-0 text-body-secondary">
              © 2025 DevSphere Inc.
            </span>
          </div>
          <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            {/* Add any footer links here if needed */}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
